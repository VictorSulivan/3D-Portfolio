import { profile } from "@/lib/portfolio";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-atmosphere noise">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 animate-drift rounded-full bg-moss-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-80 w-80 animate-drift rounded-full bg-brass-400/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:px-8 md:pb-28">
        <p className="animate-rise font-sans text-sm uppercase tracking-[0.28em] text-moss-400">
          Portfolio
        </p>
        <h1 className="animate-rise-delay mt-4 max-w-4xl font-display text-5xl leading-[0.95] text-mist-50 sm:text-6xl md:text-7xl lg:text-8xl">
          {profile.brand}
        </h1>
        <p className="animate-rise-late mt-6 max-w-xl text-lg text-mist-200/90 md:text-xl">
          {profile.tagline}
        </p>
        <div className="animate-rise-late mt-10 flex flex-wrap gap-4">
          <a
            href="#projets"
            className="rounded-sm bg-brass-400 px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-brass-300"
          >
            Voir les projets
          </a>
          <a
            href="#competences"
            className="rounded-sm border border-mist-200/25 px-6 py-3 text-sm text-mist-100 transition hover:border-moss-400/60 hover:text-moss-400"
          >
            Compétences
          </a>
        </div>
        <p className="mt-14 max-w-md text-sm text-mist-400">
          {profile.role} · {profile.location}
        </p>
      </div>
    </section>
  );
}
