import { skillGroups } from "@/lib/portfolio";

export function SkillsSection() {
  return (
    <section id="competences" className="relative px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          // compétences
        </p>
        <h2 className="mt-3 max-w-2xl font-mono text-2xl font-semibold text-gh-text md:text-3xl">
          Développement, DevOps et delivery
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gh-muted md:text-base">
          Une stack orientée production : code clair, pipelines stables,
          collaboration efficace.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-md border border-gh-border bg-gh-bg/80 p-5"
            >
              <h3 className="font-mono text-sm font-semibold text-gh-text">
                {group.title}
              </h3>
              <p className="mt-1.5 text-xs text-gh-muted">{group.summary}</p>
              <ul className="mt-5 space-y-2 border-t border-gh-border pt-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-mono text-xs text-gh-subtle"
                  >
                    <span className="mt-0.5 text-gh-muted">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
