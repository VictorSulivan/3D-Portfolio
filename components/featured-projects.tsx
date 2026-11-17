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
    <section id="projets" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="section-rule mb-16" />
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
          Projets sélectionnés
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-mist-50 md:text-5xl">
          Travaux mis en avant
        </h2>
        <p className="mt-4 max-w-2xl text-mist-200/80">
          Projets gérés depuis le CRM et persistés en base — mis à jour hors
          du seul listing GitHub.
        </p>

        <div className="mt-14 space-y-10">
          {list.map((project, index) => (
            <article
              key={project.id}
              className="group grid gap-4 border-b border-mist-200/10 pb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-moss-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-3xl text-mist-50 transition group-hover:text-brass-300">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-2xl text-mist-200/80">
                  {project.description}
                </p>
                {tagList(project.tags).length > 0 && (
                  <p className="mt-4 text-sm text-mist-400">
                    {tagList(project.tags).join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-brass-300 underline-offset-4 hover:underline"
                  >
                    Démo
                  </a>
                ) : null}
                {project.repo_url ? (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-mist-200 underline-offset-4 hover:underline"
                  >
                    Code
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
