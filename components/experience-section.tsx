import { experiences } from "@/lib/portfolio";

export function ExperienceSection() {
  return (
    <section id="parcours" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="section-rule mb-16" />
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
          Parcours
        </p>
        <h2 className="mt-3 font-display text-4xl text-mist-50 md:text-5xl">
          Expérience récente
        </h2>
        <div className="mt-12 space-y-10">
          {experiences.map((item) => (
            <article
              key={`${item.company}-${item.title}`}
              className="grid gap-2 border-l border-moss-400/40 pl-6 md:grid-cols-[220px_1fr]"
            >
              <p className="text-sm text-mist-400">{item.period}</p>
              <div>
                <h3 className="font-display text-2xl text-mist-50">
                  {item.title}
                </h3>
                <p className="mt-1 text-brass-300">{item.company}</p>
                <ul className="mt-3 space-y-1.5 text-mist-200/80">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
