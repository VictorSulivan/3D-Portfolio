import Link from "next/link";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-mist-200/10 px-6 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-mist-400 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/admin" className="hover:text-mist-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
