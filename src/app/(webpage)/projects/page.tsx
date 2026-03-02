import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/Projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildCmsSeoMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { getProjects, getProjectsPage, getSeoConfig } from "@/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const projectsPage = await getProjectsPage();
  return buildCmsSeoMetadata(projectsPage.seo);
}

export default async function Page() {
  const projects = await getProjects();
  const projectsPage = await getProjectsPage();
  const seoConfig = await getSeoConfig();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ], seoConfig.metadataBase)}
      />
      <ProjectsPage projects={projects} projectsPage={projectsPage} />
    </>
  );
}
