import { profile } from "@/lib/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-sm border border-mist-200/10 bg-ink-900/50 px-8 py-16 md:px-14">
        <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
          Contact
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-mist-50 md:text-5xl">
          Un projet, une idée, une collaboration ?
        </h2>
        <p className="mt-4 max-w-xl text-mist-200/80">
          Écrivons-nous pour parler stack, délais et ambition produit.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-sm bg-moss-500 px-6 py-3 text-sm font-medium text-mist-50 transition hover:bg-moss-400"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-mist-200/20 px-6 py-3 text-sm text-mist-100 transition hover:border-brass-400/50"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
