"use client";

import Link from "next/link";
import { OpenTerminalButton } from "@/components/fake-terminal";
import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/lib/portfolio";

export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-atmosphere noise">
      <div className="pointer-events-none absolute inset-0 grid-fade" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-5 pb-16 pt-36 md:px-6 md:pb-20 md:pt-28">
        <p className="animate-rise font-mono text-xs text-gh-muted md:text-sm">
          <Link href="/secrets" className="text-gh-subtle" aria-label="$">
            $
          </Link>{" "}
          whoami
        </p>
        <h1 className="animate-rise-delay terminal-cursor mt-4 max-w-3xl font-mono text-4xl font-semibold leading-tight tracking-tight text-gh-text sm:text-5xl md:text-6xl">
          {profile.brand}
        </h1>
        <p className="animate-rise-late mt-5 max-w-xl text-base leading-relaxed text-gh-subtle md:text-lg">
          {t.profile.tagline}
        </p>
        <div className="animate-rise-late mt-9 flex flex-wrap gap-3">
          <Link
            href="/projets"
            className="inline-flex rounded-md bg-white px-5 py-2.5 font-mono text-sm font-medium text-gh-canvas transition hover:bg-gh-subtle"
          >
            {t.hero.seeProjects}
          </Link>
          <OpenTerminalButton className="inline-flex rounded-md border border-gh-border bg-gh-surface px-5 py-2.5 font-mono text-sm text-gh-text transition hover:border-gh-muted hover:bg-gh-hover">
            {t.hero.openTerminal}
          </OpenTerminalButton>
        </div>
        <p className="mt-12 font-mono text-xs text-gh-muted md:text-sm">
          {t.profile.role}
          <span className="mx-2 text-gh-border">|</span>
          {t.profile.location}
        </p>
        <HiddenClue command="rm-rf" />
        <HiddenClue command="hack" className="mt-2" />
      </div>
    </section>
  );
}
