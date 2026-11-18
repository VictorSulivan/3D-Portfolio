"use client";

import Link from "next/link";
import { LanguageSelect, useLocale } from "@/components/locale-provider";
import { profile } from "@/lib/portfolio";

export function SiteHeader() {
  const { t } = useLocale();
  const links = [
    { href: "/competences", label: t.nav.skills },
    { href: "/projets", label: t.nav.projects },
    { href: "/github", label: t.nav.github },
    { href: "/parcours", label: t.nav.experience },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-gh-border/60 bg-gh-canvas/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3.5 md:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-gh-text transition hover:text-white md:text-base"
        >
          {profile.brand}
          <span className="text-gh-muted"> / portfolio</span>
        </Link>
        <nav className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-gh-muted md:order-none md:w-auto md:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-gh-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <Link
            href="/contact"
            className="rounded-md border border-gh-border bg-gh-surface px-3 py-1.5 font-mono text-xs text-gh-text transition hover:border-gh-muted hover:bg-gh-hover"
          >
            {t.nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
