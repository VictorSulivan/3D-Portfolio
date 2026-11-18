import { profile } from "@/lib/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-5 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-5xl rounded-md border border-gh-border bg-gh-surface px-6 py-12 md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
          // contact
        </p>
        <h2 className="mt-3 max-w-xl font-mono text-2xl font-semibold text-gh-text md:text-3xl">
          Un projet en tête ?
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-gh-muted md:text-base">
          Écrivons-nous pour parler stack, délais et ambition produit.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex rounded-md bg-white px-5 py-2.5 font-mono text-sm font-medium text-gh-canvas transition hover:bg-gh-subtle"
        >
          {profile.email}
        </a>
      </div>
    </section>
  );
}
