export type CommandEntry = {
  lines?: string[];
  error?: boolean;
  navigate?: string;
  clear?: boolean;
  close?: boolean;
  alias?: string;
};

export type TerminalData = {
  prompt: string;
  welcome: string[];
  unknown: string;
  hunt: string[];
  commands: Record<string, CommandEntry>;
};

export type ListedCommand = {
  name: string;
  lines: string[];
  alias?: string;
  navigate?: string;
  clear?: boolean;
  close?: boolean;
};

export type CommandResult = {
  lines: string[];
  error?: boolean;
  navigate?: string;
  close?: boolean;
  clear?: boolean;
};

export function createTerminal(data: TerminalData) {
  const commands = new Map(
    Object.entries(data.commands).map(([name, entry]) => [normalize(name), entry]),
  );
  const challengeCommands = data.hunt.map((command) => normalize(command));

  function resolve(name: string, seen: Set<string>): CommandEntry | null {
    const entry = commands.get(name);
    if (!entry || seen.has(name)) return null;
    if (!entry.alias) return entry;
    seen.add(name);
    return resolve(normalize(entry.alias), seen);
  }

  function runCommand(raw: string): CommandResult {
    const input = raw.trim().replace(/\s+/g, " ");
    if (!input) return { lines: [] };

    const entry = resolve(normalize(input), new Set());
    if (!entry) {
      return {
        error: true,
        lines: [data.unknown.split("{command}").join(input)],
      };
    }

    return {
      lines: entry.lines ?? [],
      error: entry.error,
      navigate: entry.navigate,
      close: entry.close,
      clear: entry.clear,
    };
  }

  function listCommands(): ListedCommand[] {
    return Object.entries(data.commands).map(([name, entry]) => {
      const resolved = resolve(normalize(name), new Set());
      return {
        name,
        lines: resolved?.lines ?? [],
        alias: entry.alias,
        navigate: resolved?.navigate,
        clear: resolved?.clear,
        close: resolved?.close,
      };
    });
  }

  return {
    prompt: data.prompt,
    welcome: data.welcome,
    challengeCommands,
    runCommand,
    listCommands,
  };
}

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}
