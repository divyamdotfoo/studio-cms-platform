import { cookies, headers } from "next/headers";
import { writeFile, copyFile } from "fs/promises";
import path from "path";
import { Octokit } from "octokit";

const ACTIVE_PATH = "cms/active/content.json";
const BRANCH = "main";

function backupName() {
  const now = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `cms/last_used_${p(now.getDate())}_${p(
    now.getMonth() + 1
  )}_${now.getFullYear()}_${p(now.getHours())}${p(now.getMinutes())}${p(
    now.getSeconds()
  )}.json`;
}

export async function POST(request: Request) {
  /* ── 1. Origin check (strict) ── */
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");

  if (!origin || !host) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const originHost = new URL(origin).host;
    if (originHost !== host) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  } catch {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  /* ── 2. Cookie authentication ── */
  const secret = process.env.secret;
  if (!secret) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const secretCookie = cookieStore.get("secret")?.value;

  if (!secretCookie) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = await Bun.password.verify(secret, secretCookie);

  if (!isValid) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* ── 3. Parse and validate incoming JSON ── */
  let content: unknown;
  try {
    content = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return Response.json(
      { error: "Content must be a JSON object" },
      { status: 400 }
    );
  }

  const obj = content as Record<string, unknown>;
  if (!obj.general || !obj.projects || !obj.pages) {
    return Response.json(
      { error: "Content must contain 'general', 'projects', and 'pages' keys" },
      { status: 400 }
    );
  }

  const prettyJson = JSON.stringify(content, null, 2) + "\n";

  /* ── 4. Route by environment ── */
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return handleLocal(prettyJson);
  }
  return handleGit(prettyJson);
}

/* ════════════════════════════════════════════════════
 * LOCAL / DEVELOPMENT — file-system writes
 * ════════════════════════════════════════════════════ */

async function handleLocal(prettyJson: string) {
  const activePath = path.join(process.cwd(), ACTIVE_PATH);
  const bkPath = path.join(process.cwd(), backupName());

  try {
    await copyFile(activePath, bkPath);
  } catch {
    return Response.json({ error: "Failed to create backup" }, { status: 500 });
  }

  try {
    await writeFile(activePath, prettyJson, "utf-8");
  } catch {
    return Response.json({ error: "Failed to write content" }, { status: 500 });
  }

  return Response.json({ success: true });
}

/* ════════════════════════════════════════════════════
 * PRODUCTION — commit via GitHub API (Octokit)
 * ════════════════════════════════════════════════════ */

async function handleGit(prettyJson: string) {
  const token = process.env.gh_pat;
  const owner = process.env.gh_username;
  const repo = process.env.gh_repo;

  if (!token || !owner || !repo) {
    return Response.json(
      { error: "GitHub credentials not configured" },
      { status: 500 }
    );
  }

  const octokit = new Octokit({ auth: token });

  try {
    /* 1. Read the current active file to use as the backup blob */
    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: ACTIVE_PATH,
      ref: BRANCH,
    });

    if (Array.isArray(currentFile) || !("sha" in currentFile)) {
      return Response.json(
        { error: "Could not read current content from GitHub" },
        { status: 500 }
      );
    }

    const currentBlobSha = currentFile.sha;

    /* 2. Get latest commit & base tree */
    const { data: ref } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${BRANCH}`,
    });
    const latestCommitSha = ref.object.sha;

    const { data: commit } = await octokit.rest.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commit.tree.sha;

    /* 3. Create blob for the new content */
    const { data: newBlob } = await octokit.rest.git.createBlob({
      owner,
      repo,
      content: Buffer.from(prettyJson).toString("base64"),
      encoding: "base64",
    });

    /* 4. Create tree: backup old file + write new file */
    const backupGitPath = backupName();

    const { data: newTree } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: [
        {
          path: backupGitPath,
          mode: "100644",
          type: "blob",
          sha: currentBlobSha,
        },
        {
          path: ACTIVE_PATH,
          mode: "100644",
          type: "blob",
          sha: newBlob.sha,
        },
      ],
    });

    /* 5. Create commit */
    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `cms: update content`,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    /* 6. Update branch ref (fast-forward only — fails safely on conflict) */
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${BRANCH}`,
      sha: newCommit.sha,
    });

    return Response.json({ success: true, commit: newCommit.sha });
  } catch (err) {
    const message = err instanceof Error ? err.message : "GitHub API error";
    return Response.json({ error: message }, { status: 500 });
  }
}
