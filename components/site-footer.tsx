import Link from "next/link";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-gh-border px-5 py-8 md:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 font-mono text-xs text-gh-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-gh-text"
          >
            GitHub
          </a>
          <Link href="/admin" className="hover:text-gh-text">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
