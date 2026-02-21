import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import content from "@/cms/active/content.json";
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

  return <ContentForm initialContent={content} />;
}
