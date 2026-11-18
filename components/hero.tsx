import { profile } from "@/lib/portfolio";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-atmosphere noise">
      <div className="pointer-events-none absolute inset-0 grid-fade" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center px-5 pb-16 pt-28 md:px-6 md:pb-20">
        <p className="animate-rise font-mono text-xs text-gh-muted md:text-sm">
          <span className="text-gh-subtle">$</span> whoami
        </p>
        <h1 className="animate-rise-delay terminal-cursor mt-4 max-w-3xl font-mono text-4xl font-semibold leading-tight tracking-tight text-gh-text sm:text-5xl md:text-6xl">
          {profile.brand}
        </h1>
        <p className="animate-rise-late mt-5 max-w-xl text-base leading-relaxed text-gh-subtle md:text-lg">
          {profile.tagline}
        </p>
        <div className="animate-rise-late mt-9">
          <a
            href="#projets"
            className="inline-flex rounded-md bg-white px-5 py-2.5 font-mono text-sm font-medium text-gh-canvas transition hover:bg-gh-subtle"
          >
            Voir les projets
          </a>
        </div>
        <p className="mt-12 font-mono text-xs text-gh-muted md:text-sm">
          {profile.role}
          <span className="mx-2 text-gh-border">|</span>
          {profile.location}
        </p>
      </div>
    </section>
  );
}
