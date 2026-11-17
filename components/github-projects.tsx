import type { GithubFetchResult } from "@/lib/github";

export function GithubProjects({ data }: { data: GithubFetchResult }) {
  return (
    <section id="github" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
          GitHub
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-mist-50 md:text-5xl">
          Dépôts publics de {data.username}
        </h2>
        <p className="mt-4 max-w-2xl text-mist-200/80">
          Compte personnel
          {data.orgs.length > 0
            ? ` et organisations : ${data.orgs.join(", ")}`
            : " (aucune organisation publique détectée pour le moment)"}
          .
        </p>
        {data.message ? (
          <p className="mt-3 text-sm text-brass-300/90">{data.message}</p>
        ) : null}

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {data.repos.slice(0, 12).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block border border-mist-200/10 bg-ink-900/40 p-5 transition hover:border-moss-400/40 hover:bg-ink-800/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl text-mist-50">
                  {repo.name}
                </h3>
                <span className="shrink-0 text-xs uppercase tracking-wider text-mist-400">
                  {repo.source === "org" ? "org" : "user"}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-mist-200/75">
                {repo.description || "Pas de description."}
              </p>
              <p className="mt-4 text-xs text-mist-400">
                {repo.owner_login}
                {repo.language ? ` · ${repo.language}` : ""}
                {` · ★ ${repo.stargazers_count}`}
              </p>
            </a>
          ))}
        </div>

        {data.repos.length === 0 ? (
          <p className="mt-8 text-mist-400">Aucun dépôt public trouvé.</p>
        ) : null}
      </div>
    </section>
  );
}
