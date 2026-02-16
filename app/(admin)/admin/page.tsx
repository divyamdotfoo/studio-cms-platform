import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import type { SiteContent } from "@/cms/types";
import { ContentForm } from "../_components/ContentForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const secretCookie = cookieStore.get("secret")?.value;

  if (!secretCookie) {
    redirect("/admin/login");
  }

  const isValid = await Bun.password.verify(process.env.secret!, secretCookie);

  if (!isValid) {
    redirect("/admin/login");
  }

  const filePath = path.join(process.cwd(), "public", "content.json");
  const raw = await readFile(filePath, "utf-8");
  const content = JSON.parse(raw) as SiteContent;

  return <ContentForm initialContent={content} />;
}
