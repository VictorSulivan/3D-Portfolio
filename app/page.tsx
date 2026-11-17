import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { GithubProjects } from "@/components/github-projects";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkillsSection } from "@/components/skills-section";
import { fetchGithubPortfolio } from "@/lib/github";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projectsResult, githubResult] = await Promise.allSettled([
    listProjects(),
    fetchGithubPortfolio(),
  ]);
  const projects =
    projectsResult.status === "fulfilled" ? projectsResult.value : [];
  const github =
    githubResult.status === "fulfilled"
      ? githubResult.value
      : {
          username: "VictorSulivan",
          orgs: [] as string[],
          repos: [],
          source: "fallback" as const,
          message: "GitHub temporairement indisponible.",
        };

  return (
    <main className="bg-ink-950 text-mist-100">
      <SiteHeader />
      <Hero />
      <SkillsSection />
      <FeaturedProjects projects={projects} />
      <GithubProjects data={github} />
      <ExperienceSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
