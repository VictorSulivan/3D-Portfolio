"use client";

import { useMemo } from "react";
import { useLocale } from "@/components/locale-provider";
import { createTerminal } from "@/lib/terminal";

export function SecretsList() {
  const { t } = useLocale();
  const commands = useMemo(() => createTerminal(t.terminal).listCommands(), [t]);

  return (
    <main className="min-h-[100svh] px-5 pb-28 pt-36 md:px-8 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          {t.secrets.eyebrow}
        </p>
        <h1 className="mt-5 font-mono text-3xl font-semibold text-gh-text md:text-5xl">
          {t.secrets.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gh-muted md:text-lg">
          {t.secrets.intro}
        </p>
        <ul className="mt-16 space-y-8">
          {commands.map((command) => (
            <li key={command.name} className="border-t border-gh-border pt-8">
              <p className="font-mono text-base font-semibold text-gh-text">{command.name}</p>
              {command.alias ? (
                <p className="mt-3 font-mono text-sm text-gh-muted">
                  {t.secrets.aliasOf} {command.alias}
                </p>
              ) : null}
              {command.lines.length > 0 ? (
                <pre className="mt-3 whitespace-pre-wrap font-mono text-sm leading-relaxed text-gh-muted">
                  {command.lines.join("\n")}
                </pre>
              ) : null}
              {command.navigate ? (
                <p className="mt-3 font-mono text-sm text-gh-muted">
                  {t.secrets.opens} {command.navigate}
                </p>
              ) : null}
              {command.clear ? (
                <p className="mt-3 font-mono text-sm text-gh-muted">{t.secrets.clears}</p>
              ) : null}
              {command.close ? (
                <p className="mt-3 font-mono text-sm text-gh-muted">{t.secrets.closes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
