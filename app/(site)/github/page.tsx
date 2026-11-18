import { GithubProjects } from "@/components/github-projects";
import { fetchGithubPortfolio } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function GithubPage() {
  const data = await fetchGithubPortfolio();

  return (
    <main>
      <GithubProjects data={data} />
    </main>
  );
}
