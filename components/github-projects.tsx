"use client";

import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import type { GithubFetchResult } from "@/lib/github";

export function GithubProjects({ data }: { data: GithubFetchResult }) {
  const { t } = useLocale();
  return (
    <section id="github" className="relative min-h-[100svh] px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.github.eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          @{data.username}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gh-muted md:text-lg">
          {t.github.account}
          {data.orgs.length > 0
            ? `${t.github.orgsPrefix}${data.orgs.join(", ")}`
            : ""}
          .
        </p>
        {data.message ? (
          <p className="mt-2 font-mono text-xs text-gh-subtle">{data.message}</p>
        ) : null}

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {data.repos.slice(0, 12).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md border border-gh-border bg-gh-bg/70 p-6 transition hover:border-gh-muted hover:bg-gh-hover/50 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-mono text-base font-semibold text-gh-text">
                  {repo.name}
                </h3>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-gh-muted">
                  {repo.source === "org" ? t.github.org : t.github.user}
                </span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gh-muted">
                {repo.description || t.github.noDescription}
              </p>
              <p className="mt-6 font-mono text-xs text-gh-muted">
                {repo.owner_login}
                {repo.language ? ` · ${repo.language}` : ""}
                {` · ★ ${repo.stargazers_count}`}
              </p>
            </a>
          ))}
        </div>

        {data.repos.length === 0 ? (
          <p className="mt-8 font-mono text-sm text-gh-muted">
            {t.github.empty}
          </p>
        ) : null}
        <HiddenClue command="alan" />
      </div>
    </section>
  );
}
