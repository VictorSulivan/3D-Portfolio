"use client";

import { HiddenClue } from "@/components/hidden-clue";
import { useLocale } from "@/components/locale-provider";
import { profile } from "@/lib/portfolio";

export function SiteFooter() {
  const { t } = useLocale();
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
            {t.footer.github}
          </a>
          <HiddenClue command="ls -a" className="" />
          <HiddenClue command="shutdown" className="" />
        </div>
      </div>
    </footer>
  );
}
