import { skillGroups } from "@/lib/portfolio";

export function SkillsSection() {
  return (
    <section id="competences" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
          Compétences
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-mist-50 md:text-5xl">
          Développement, DevOps et savoir-faire produit
        </h2>
        <p className="mt-4 max-w-2xl text-mist-200/80">
          Une stack orientée livraison : code clair, pipelines stables, et
          collaboration efficace.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className="animate-rise border-t border-mist-200/15 pt-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="font-display text-2xl text-mist-50">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-mist-400">{group.summary}</p>
              <ul className="mt-6 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-mist-100/90"
                  >
                    <span className="h-px w-4 bg-moss-400/80" />
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
