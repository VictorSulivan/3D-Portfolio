"use client";

import Link from "next/link";
import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import type { PortfolioProject } from "@/lib/projects";

function tagList(tags: string) {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function FeaturedProjects({
  projects,
  featuredOnly = true,
}: {
  projects: PortfolioProject[];
  featuredOnly?: boolean;
}) {
  const { t } = useLocale();
  const featured = projects.filter((p) => p.featured);
  const list = featuredOnly
    ? featured.length > 0
      ? featured
      : projects.slice(0, 4)
    : projects;

  return (
    <section id="projets" className="relative min-h-[100svh] px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.projects.eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          {t.projects.heading}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gh-muted md:text-lg">
          {t.projects.intro}
        </p>

        <div className="mt-16 space-y-4">
          {list.map((project) => (
            <article
              key={project.id}
              className="flex flex-col gap-6 rounded-md border border-gh-border bg-gh-bg/60 p-7 transition hover:bg-gh-hover/40 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="min-w-0">
                <h3 className="font-mono text-lg font-semibold text-gh-text md:text-xl">
                  <Link
                    href={`/projets/${project.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-gh-muted">
                  {project.description}
                </p>
                {tagList(project.tags).length > 0 && (
                  <p className="mt-5 font-mono text-xs text-gh-muted">
                    {tagList(project.tags).join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-5 font-mono text-sm">
                <Link
                  href={`/projets/${project.id}`}
                  className="text-gh-text underline-offset-4 hover:underline"
                >
                  {t.projects.sheet}
                </Link>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gh-text underline-offset-4 hover:underline"
                  >
                    {t.projects.site}
                  </a>
                ) : null}
                {project.repo_url ? (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gh-muted underline-offset-4 hover:text-gh-text hover:underline"
                  >
                    {t.projects.code}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
          {list.length === 0 ? (
            <p className="p-5 font-mono text-sm text-gh-muted">
              {t.projects.empty}
            </p>
          ) : null}
        </div>
        <HiddenClue command="vim" />
      </div>
    </section>
  );
}
