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
  const [projects, github] = await Promise.all([
    listProjects(),
    fetchGithubPortfolio(),
  ]);

  return (
    <main className="bg-gh-canvas text-gh-text">
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
