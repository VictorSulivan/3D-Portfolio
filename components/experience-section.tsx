"use client";

import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";

export function ExperienceSection() {
  const { t } = useLocale();
  return (
    <section id="parcours" className="relative min-h-[100svh] px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.experience.eyebrow}
        </p>
        <h2 className="mt-5 font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          {t.experience.title}
        </h2>
        <div className="mt-16 space-y-5">
          {t.experience.items.map((item) => (
            <article
              key={`${item.company}-${item.title}`}
              className="grid gap-4 rounded-md border border-gh-border bg-gh-bg/50 p-7 md:grid-cols-[240px_1fr] md:gap-10 md:p-9"
            >
              <p className="font-mono text-sm text-gh-muted">{item.period}</p>
              <div>
                <h3 className="font-mono text-lg font-semibold text-gh-text md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 font-mono text-sm text-gh-subtle">
                  {item.company}
                </p>
                <ul className="mt-6 space-y-3 text-base leading-relaxed text-gh-muted">
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
        <HiddenClue command="neofetch" />
      </div>
    </section>
  );
}
