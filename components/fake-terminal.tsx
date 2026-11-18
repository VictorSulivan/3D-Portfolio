"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocale } from "@/components/locale-provider";
import { createTerminal } from "@/lib/terminal";

type Line = { id: number; kind: "in" | "out" | "err"; text: string };

const TerminalContext = createContext<{ open: () => void }>({ open: () => {} });
const HUNT_STORAGE = "portfolio-terminal-hunt";

function readFound(): Set<string> {
  try {
    const raw = sessionStorage.getItem(HUNT_STORAGE);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

function remember(command: string) {
  const found = readFound();
  found.add(command);
  sessionStorage.setItem(HUNT_STORAGE, JSON.stringify([...found]));
  return found.size;
}

export function useTerminal() {
  return useContext(TerminalContext);
}

export function TerminalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openTerminal = useCallback(() => setOpen(true), []);
  const closeTerminal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open: openTerminal }), [openTerminal]);

  return (
    <TerminalContext.Provider value={value}>
      {children}
      {open ? <FakeTerminal onClose={closeTerminal} /> : null}
    </TerminalContext.Provider>
  );
}

export function OpenTerminalButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useTerminal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

function FakeTerminal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { t } = useLocale();
  const terminal = useMemo(() => createTerminal(t.terminal), [t]);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const nextId = useRef(10);
  const draft = useRef("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  useEffect(() => {
    setLines(
      terminal.welcome.map((text, index) => ({
        id: index + 1,
        kind: "out" as const,
        text,
      })),
    );
    nextId.current = terminal.welcome.length + 1;
  }, [terminal]);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [lines, input]);

  function push(kind: Line["kind"], text: string) {
    const id = nextId.current++;
    return { id, kind, text };
  }

  function submit(raw: string) {
    const result = terminal.runCommand(raw);
    if (raw.trim()) setHistory((current) => [...current, raw]);
    if (result.clear) {
      setLines([]);
      return;
    }

    const echoed = push("in", `${terminal.prompt} ${raw}`);
    const output = result.lines.map((text) => push(result.error ? "err" : "out", text));
    const typed = raw.trim().replace(/\s+/g, " ").toLowerCase();
    const fill = (template: string, count: number) => template.replace("{count}", String(count));
    if (terminal.challengeCommands.includes(typed)) {
      const count = remember(typed);
      output.push(
        push(
          "out",
          count === terminal.challengeCommands.length
            ? t.terminalUi.allFound
            : fill(t.terminalUi.noted, count),
        ),
      );
    }
    if (typed === "challenge") {
      const count = readFound().size;
      output.push(
        push(
          "out",
          count === terminal.challengeCommands.length
            ? t.terminalUi.alreadyFound
            : fill(t.terminalUi.progress, count),
        ),
      );
    }
    setLines((current) => [...current, echoed, ...output]);
    if (result.navigate) {
      router.push(result.navigate);
      onClose();
    } else if (result.close) {
      onClose();
    }
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const raw = input;
    setInput("");
    setCursor(null);
    draft.current = "";
    submit(raw);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      if (terminal.runCommand("clear").clear) setLines([]);
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (history.length === 0) return;
    event.preventDefault();
    if (cursor === null) draft.current = input;
    if (event.key === "ArrowUp") {
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next] ?? "");
      return;
    }
    if (cursor === null) return;
    const next = cursor + 1;
    if (next >= history.length) {
      setCursor(null);
      setInput(draft.current);
      return;
    }
    setCursor(next);
    setInput(history[next] ?? "");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 sm:items-center md:p-6"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.terminalUi.dialogLabel}
        className="flex h-[min(34rem,88svh)] w-full max-w-3xl flex-col overflow-hidden rounded-md border border-gh-border bg-gh-bg shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gh-border px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f85149]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d29922]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3fb950]" />
            <span className="ml-2 font-mono text-[11px] text-gh-muted">
              visitor@portfolio
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] text-gh-muted transition hover:text-gh-text"
          >
            {t.terminalUi.close}
          </button>
        </div>
        <div
          ref={scroller}
          className="flex-1 overflow-y-auto px-3 py-3 font-mono text-[13px] leading-6"
        >
          {lines.map((line) => (
            <p
              key={line.id}
              className={
                line.kind === "err"
                  ? "whitespace-pre-wrap text-[#f85149]"
                  : line.kind === "in"
                    ? "whitespace-pre-wrap text-gh-text"
                    : "whitespace-pre-wrap text-gh-muted"
              }
            >
              {line.text || " "}
            </p>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2 text-gh-text">
            <span className="shrink-0 text-gh-subtle">{terminal.prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={t.terminalUi.inputLabel}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-gh-text outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
