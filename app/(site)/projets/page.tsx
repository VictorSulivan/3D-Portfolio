import { FeaturedProjects } from "@/components/featured-projects";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <main>
      <FeaturedProjects projects={projects} featuredOnly={false} />
    </main>
  );
}
