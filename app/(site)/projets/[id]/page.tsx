import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectView } from "@/components/project-view";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) return { title: "Projet | Mathéo Guillemin" };
  const project = await getProject(id);
  return {
    title: project
      ? `${project.title} | Mathéo Guillemin`
      : "Projet | Mathéo Guillemin",
    description: project?.description,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) notFound();

  const project = await getProject(id);
  if (!project) notFound();

  return <ProjectView project={project} />;
}
