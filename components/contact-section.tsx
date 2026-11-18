"use client";

import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/lib/portfolio";

export function ContactSection() {
  const { t } = useLocale();
  return (
    <section id="contact" className="relative flex min-h-[100svh] items-center px-5 pb-28 pt-36 md:px-8 md:pb-32 md:pt-40">
      <div className="mx-auto w-full max-w-4xl rounded-md border border-gh-border bg-gh-surface px-8 py-16 md:px-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.contact.eyebrow}
        </p>
        <h2 className="mt-6 max-w-xl font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          {t.contact.title}
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-gh-muted md:text-lg">
          {t.contact.intro}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-12 inline-flex rounded-md bg-white px-6 py-3 font-mono text-sm font-medium text-gh-canvas transition hover:bg-gh-subtle"
        >
          {profile.email}
        </a>
        <HiddenClue command="sudo" />
      </div>
    </section>
  );
}
