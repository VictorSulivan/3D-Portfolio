"use client";

import Link from "next/link";
import { useEffect } from "react";
import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import type { PortfolioProject } from "@/lib/projects";

function tagList(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function ProjectView({ project }: { project: PortfolioProject }) {
  const { t } = useLocale();
  const tags = tagList(project.tags);

  useEffect(() => {
    document.title = `${project.title} | Mathéo Guillemin`;
  }, [project.title]);

  return (
    <main className="flex min-h-[100svh] flex-col justify-center px-5 pb-28 pt-36 md:px-8 md:pb-32 md:pt-40">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          href="/projets"
          className="font-mono text-sm text-gh-muted transition hover:text-gh-text"
        >
          {t.projects.back}
        </Link>
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.projects.projectEyebrow}
        </p>
        <h1 className="mt-5 font-mono text-4xl font-semibold leading-tight text-gh-text md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gh-muted">
          {project.description || t.projects.noDescription}
        </p>
        {tags.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-gh-border px-3 py-1.5 font-mono text-xs text-gh-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-12 flex flex-wrap gap-4 font-mono text-sm">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-white px-6 py-3 font-medium text-gh-canvas transition hover:bg-gh-subtle"
            >
              {t.projects.seeSite}
            </a>
          ) : null}
          {project.repo_url ? (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-gh-border px-6 py-3 text-gh-text transition hover:border-gh-muted hover:bg-gh-hover"
            >
              {t.projects.seeCode}
            </a>
          ) : null}
        </div>
        <HiddenClue command="cat .secret" />
      </article>
    </main>
  );
}
