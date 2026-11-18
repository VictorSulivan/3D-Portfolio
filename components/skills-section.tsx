"use client";

import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";

export function SkillsSection() {
  const { t } = useLocale();
  return (
    <section id="competences" className="relative min-h-[100svh] px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.skills.eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          {t.skills.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gh-muted md:text-lg">
          {t.skills.intro}
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {t.skills.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-md border border-gh-border bg-gh-bg/80 p-7 md:p-8"
            >
              <h3 className="font-mono text-base font-semibold text-gh-text">
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gh-muted">{group.summary}</p>
              <ul className="mt-8 space-y-3 border-t border-gh-border pt-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-mono text-sm text-gh-subtle"
                  >
                    <span className="mt-0.5 text-gh-muted">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <HiddenClue command="coffee" />
      </div>
    </section>
  );
}
