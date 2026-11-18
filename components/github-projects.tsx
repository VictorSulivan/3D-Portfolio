import type { GithubFetchResult } from "@/lib/github";

export function GithubProjects({ data }: { data: GithubFetchResult }) {
  return (
    <section id="github" className="relative px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          // github
        </p>
        <h2 className="mt-3 max-w-2xl font-mono text-2xl font-semibold text-gh-text md:text-3xl">
          @{data.username}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gh-muted md:text-base">
          Dépôts publics du compte
          {data.orgs.length > 0
            ? ` et orgs : ${data.orgs.join(", ")}`
            : ""}
          .
        </p>
        {data.message ? (
          <p className="mt-2 font-mono text-xs text-gh-subtle">{data.message}</p>
        ) : null}

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {data.repos.slice(0, 12).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md border border-gh-border bg-gh-bg/70 p-4 transition hover:border-gh-muted hover:bg-gh-hover/50"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-sm font-semibold text-gh-text">
                  {repo.name}
                </h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-gh-muted">
                  {repo.source === "org" ? "org" : "user"}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gh-muted">
                {repo.description || "Pas de description."}
              </p>
              <p className="mt-3 font-mono text-[11px] text-gh-muted">
                {repo.owner_login}
                {repo.language ? ` · ${repo.language}` : ""}
                {` · ★ ${repo.stargazers_count}`}
              </p>
            </a>
          ))}
        </div>

        {data.repos.length === 0 ? (
          <p className="mt-8 font-mono text-sm text-gh-muted">
            Aucun dépôt public trouvé.
          </p>
        ) : null}
      </div>
    </section>
  );
}
