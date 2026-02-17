import { cookies, headers } from "next/headers";
import { writeFile, copyFile, mkdir } from "fs/promises";
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

interface NewImage {
  targetPath: string;
  file: File;
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

  /* ── 3. Parse FormData ── */
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const cmsRaw = formData.get("cms");
  if (typeof cmsRaw !== "string") {
    return Response.json(
      { error: "Missing 'cms' field in form data" },
      { status: 400 }
    );
  }

  let content: unknown;
  try {
    content = JSON.parse(cmsRaw);
  } catch {
    return Response.json(
      { error: "Invalid JSON in cms field" },
      { status: 400 }
    );
  }

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return Response.json(
      { error: "CMS content must be a JSON object" },
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

  const newImages: NewImage[] = [];
  for (const [key, value] of formData.entries()) {
    if (
      key.startsWith("file_") &&
      typeof value === "object" &&
      "arrayBuffer" in value
    ) {
      newImages.push({ targetPath: key.slice(5), file: value as File });
    }
  }

  const prettyJson = JSON.stringify(content, null, 2) + "\n";

  /* ── 4. Route by environment ── */
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return handleLocal(prettyJson, newImages);
  }
  return handleGit(prettyJson, newImages);
}

/* ════════════════════════════════════════════════════
 * LOCAL / DEVELOPMENT — file-system writes
 * ════════════════════════════════════════════════════ */

async function handleLocal(prettyJson: string, newImages: NewImage[]) {
  const cwd = process.cwd();
  const activePath = path.join(cwd, ACTIVE_PATH);
  const bkPath = path.join(cwd, backupName());

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

  for (const { targetPath, file } of newImages) {
    const fullPath = path.join(cwd, "public", targetPath);
    const dir = path.dirname(fullPath);
    try {
      await mkdir(dir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(fullPath, buffer);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return Response.json(
        { error: `Failed to write image ${targetPath}: ${msg}` },
        { status: 500 }
      );
    }
  }

  return Response.json({ success: true });
}

/* ════════════════════════════════════════════════════
 * PRODUCTION — commit via GitHub API (Octokit)
 * ════════════════════════════════════════════════════ */

async function handleGit(prettyJson: string, newImages: NewImage[]) {
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

    /* 3. Create blob for the new JSON content */
    const { data: newJsonBlob } = await octokit.rest.git.createBlob({
      owner,
      repo,
      content: Buffer.from(prettyJson).toString("base64"),
      encoding: "base64",
    });

    /* 4. Create blobs for new images */
    const imageTreeEntries: {
      path: string;
      mode: "100644";
      type: "blob";
      sha: string;
    }[] = [];

    for (const { targetPath, file } of newImages) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const { data: imgBlob } = await octokit.rest.git.createBlob({
        owner,
        repo,
        content: buffer.toString("base64"),
        encoding: "base64",
      });
      imageTreeEntries.push({
        path: `public${targetPath}`,
        mode: "100644",
        type: "blob",
        sha: imgBlob.sha,
      });
    }

    /* 5. Create tree: backup + new JSON + new images */
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
          sha: newJsonBlob.sha,
        },
        ...imageTreeEntries,
      ],
    });

    /* 7. Create commit */
    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `cms: update content`,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    /* 8. Update branch ref (fast-forward only — fails safely on conflict) */
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
