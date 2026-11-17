import Link from "next/link";
import { profile } from "@/lib/portfolio";

const links = [
  { href: "#competences", label: "Compétences" },
  { href: "#projets", label: "Projets" },
  { href: "#github", label: "GitHub" },
  { href: "#parcours", label: "Parcours" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-mist-50 transition hover:text-brass-300 md:text-2xl"
        >
          {profile.brand}
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-mist-200/80 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-brass-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-sm border border-brass-400/40 bg-brass-400/10 px-4 py-2 text-sm text-brass-300 transition hover:bg-brass-400/20"
        >
          Discutons
        </a>
      </div>
    </header>
  );
}
