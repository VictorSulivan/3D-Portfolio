import type { PortfolioProject } from "@/lib/projects";

function tagList(tags: string) {
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function FeaturedProjects({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const featured = projects.filter((p) => p.featured);
  const list = featured.length > 0 ? featured : projects.slice(0, 4);

  return (
    <section id="projets" className="relative px-5 py-20 md:px-6 md:py-28">
      <div className="section-rule mb-14" />
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          // projets
        </p>
        <h2 className="mt-3 max-w-2xl font-mono text-2xl font-semibold text-gh-text md:text-3xl">
          Sélection CRM
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gh-muted md:text-base">
          Projets mis en avant depuis la base — distincts du listing GitHub
          brut.
        </p>

        <div className="mt-10 divide-y divide-gh-border rounded-md border border-gh-border bg-gh-bg/60">
          {list.map((project) => (
            <article
              key={project.id}
              className="flex flex-col gap-3 p-5 transition hover:bg-gh-hover/40 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <h3 className="font-mono text-base font-semibold text-gh-text">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gh-muted">
                  {project.description}
                </p>
                {tagList(project.tags).length > 0 && (
                  <p className="mt-3 font-mono text-[11px] text-gh-muted">
                    {tagList(project.tags).join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-4 font-mono text-xs">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gh-text underline-offset-4 hover:underline"
                  >
                    demo
                  </a>
                ) : null}
                {project.repo_url ? (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gh-muted underline-offset-4 hover:text-gh-text hover:underline"
                  >
                    code
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
