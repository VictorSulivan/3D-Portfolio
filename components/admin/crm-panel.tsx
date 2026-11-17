"use client";

import { FormEvent, useEffect, useState } from "react";
import type { PortfolioProject } from "@/lib/projects";

type MeResponse = {
  authenticated: boolean;
  name?: string;
  email?: string;
  simulated?: boolean;
};

type FormState = {
  id?: number;
  title: string;
  description: string;
  url: string;
  repo_url: string;
  tags: string;
  featured: boolean;
  sort_order: number;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  url: "",
  repo_url: "",
  tags: "",
  featured: false,
  sort_order: 100,
};

export function CrmPanel({
  initialProjects,
}: {
  initialProjects: PortfolioProject[];
}) {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch("/api/me")
      .then((r) => r.json())
      .then((data: MeResponse) => setMe(data))
      .catch(() => setMe({ authenticated: false }));
  }, []);

  async function refresh() {
    const res = await fetch("/api/projects");
    const data = (await res.json()) as { projects: PortfolioProject[] };
    setProjects(data.projects);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        url: form.url,
        repo_url: form.repo_url,
        tags: form.tags,
        featured: form.featured,
        sort_order: form.sort_order,
      };
      const res = await fetch(
        form.id ? `/api/projects/${form.id}` : "/api/projects",
        {
          method: form.id ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error || `Erreur ${res.status}`);
      }
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l’enregistrement");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("Supprimer ce projet ?")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        throw new Error(`Erreur ${res.status}`);
      }
      if (form.id === id) setForm(emptyForm);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de la suppression");
    } finally {
      setBusy(false);
    }
  }

  if (me && !me.authenticated) {
    return (
      <div className="rounded-sm border border-brass-400/30 bg-ink-900/60 p-8">
        <h2 className="font-display text-2xl text-mist-50">Accès refusé</h2>
        <p className="mt-3 text-mist-200/80">
          Le CRM est réservé au propriétaire connecté. Publiez l’app en{" "}
          <strong className="text-brass-300">privé</strong> (owner only) pour
          administrer les projets.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="rounded-sm border border-mist-200/10 bg-ink-900/50 p-5 text-sm text-mist-200/80">
        {me?.authenticated ? (
          <p>
            Connecté en tant que{" "}
            <span className="text-brass-300">{me.name || me.email}</span>
            {me.simulated ? " (identité simulée en local)" : ""}.
          </p>
        ) : (
          <p>Vérification de l’identité…</p>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-sm border border-mist-200/10 bg-ink-900/40 p-6 md:grid-cols-2"
      >
        <h2 className="md:col-span-2 font-display text-2xl text-mist-50">
          {form.id ? "Modifier le projet" : "Ajouter un projet"}
        </h2>
        <label className="block text-sm">
          <span className="text-mist-400">Titre</span>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="block text-sm">
          <span className="text-mist-400">Ordre</span>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              setForm({ ...form, sort_order: Number(e.target.value) })
            }
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="md:col-span-2 block text-sm">
          <span className="text-mist-400">Description</span>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="block text-sm">
          <span className="text-mist-400">URL démo</span>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="block text-sm">
          <span className="text-mist-400">URL dépôt</span>
          <input
            value={form.repo_url}
            onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="block text-sm">
          <span className="text-mist-400">Tags (séparés par des virgules)</span>
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="mt-1 w-full rounded-sm border border-mist-200/15 bg-ink-950 px-3 py-2 text-mist-50 outline-none focus:border-moss-400"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-mist-200">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4 accent-brass-400"
          />
          Projet mis en avant
        </label>
        {error ? (
          <p className="md:col-span-2 text-sm text-red-300">{error}</p>
        ) : null}
        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-sm bg-brass-400 px-5 py-2.5 text-sm font-medium text-ink-950 disabled:opacity-60"
          >
            {form.id ? "Enregistrer" : "Créer"}
          </button>
          {form.id ? (
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="rounded-sm border border-mist-200/20 px-5 py-2.5 text-sm text-mist-100"
            >
              Annuler
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="font-display text-2xl text-mist-50">
          Projets en base ({projects.length})
        </h2>
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 border border-mist-200/10 bg-ink-900/30 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-display text-xl text-mist-50">
                {project.title}
                {project.featured ? (
                  <span className="ml-2 text-xs uppercase tracking-wider text-brass-300">
                    featured
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-mist-400">
                ordre {project.sort_order}
                {project.tags ? ` · ${project.tags}` : ""}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    url: project.url,
                    repo_url: project.repo_url,
                    tags: project.tags,
                    featured: project.featured,
                    sort_order: project.sort_order,
                  })
                }
                className="text-sm text-brass-300 hover:underline"
              >
                Éditer
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onDelete(project.id)}
                className="text-sm text-red-300 hover:underline"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
