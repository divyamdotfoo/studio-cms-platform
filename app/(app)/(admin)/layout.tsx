import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel — Vision Architect",
  description: "Manage site content for Vision Architect.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen">{children}</div>;
}
