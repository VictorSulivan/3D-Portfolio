import { experiences } from "@/lib/portfolio";

export function ExperienceSection() {
  return (
    <section id="parcours" className="relative px-5 py-20 md:px-6 md:py-28">
      <div className="section-rule mb-14" />
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          // parcours
        </p>
        <h2 className="mt-3 font-mono text-2xl font-semibold text-gh-text md:text-3xl">
          Expérience
        </h2>
        <div className="mt-10 space-y-0 divide-y divide-gh-border border border-gh-border rounded-md bg-gh-bg/50">
          {experiences.map((item) => (
            <article
              key={`${item.company}-${item.title}`}
              className="grid gap-2 p-5 md:grid-cols-[200px_1fr]"
            >
              <p className="font-mono text-xs text-gh-muted">{item.period}</p>
              <div>
                <h3 className="font-mono text-sm font-semibold text-gh-text">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-gh-subtle">
                  {item.company}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-gh-muted">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-gh-border">-</span>
                      <span>{point}</span>
                    </li>
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
