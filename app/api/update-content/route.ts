import { cookies, headers } from "next/headers";
import { writeFile, copyFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  /* ── 1. Origin check ── */
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");

  if (!origin || !host || !origin.includes(host)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  /* ── 2. Cookie authentication ── */
  const cookieStore = await cookies();
  const secretCookie = cookieStore.get("secret")?.value;

  if (!secretCookie) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = await Bun.password.verify(
    process.env.secret!,
    secretCookie,
  );

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

  if (!content || typeof content !== "object") {
    return Response.json(
      { error: "Content must be a JSON object" },
      { status: 400 },
    );
  }

  /* ── 4. Backup current file ── */
  const activePath = path.join(process.cwd(), "cms", "active", "content.json");
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const dateStr = `${pad(now.getDate())}_${pad(now.getMonth() + 1)}_${now.getFullYear()}`;
  const backupPath = path.join(
    process.cwd(),
    "cms",
    `last_used_${dateStr}.json`,
  );

  try {
    await copyFile(activePath, backupPath);
  } catch {
    return Response.json(
      { error: "Failed to create backup" },
      { status: 500 },
    );
  }

  /* ── 5. Write new content ── */
  try {
    await writeFile(
      activePath,
      JSON.stringify(content, null, 2),
      "utf-8",
    );
  } catch {
    return Response.json(
      { error: "Failed to write content" },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}
