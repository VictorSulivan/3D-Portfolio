export function HiddenClue({
  command,
  className = "mt-16",
}: {
  command: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-[11px] tracking-wide text-gh-muted/50 ${className}`}>{command}</p>
  );
}
