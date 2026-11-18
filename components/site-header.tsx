import Link from "next/link";
import { profile } from "@/lib/portfolio";

const links = [
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#github", label: "GitHub" },
  { href: "#parcours", label: "Parcours" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-gh-border/60 bg-gh-canvas/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-gh-text transition hover:text-white md:text-base"
        >
          {profile.brand}
          <span className="text-gh-muted"> / portfolio</span>
        </Link>
        <nav className="hidden items-center gap-5 font-mono text-xs text-gh-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-gh-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-md border border-gh-border bg-gh-surface px-3 py-1.5 font-mono text-xs text-gh-text transition hover:border-gh-muted hover:bg-gh-hover"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
