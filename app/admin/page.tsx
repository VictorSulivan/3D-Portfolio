import Link from "next/link";
import { headers } from "next/headers";
import { CrmPanel } from "@/components/admin/crm-panel";
import { requireOwner } from "@/lib/auth";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await listProjects();
  const headerList = await headers();
  const request = new Request("http://local/admin", { headers: headerList });
  const owner = await requireOwner(request);
  const authorized = !(owner instanceof Response);

  return (
    <main className="min-h-screen bg-atmosphere px-5 py-14 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gh-muted">
              // crm
            </p>
            <h1 className="mt-2 font-mono text-2xl font-semibold text-gh-text md:text-3xl">
              Gestion des projets
            </h1>
            <p className="mt-2 text-sm text-gh-muted">
              Accès réservé au propriétaire (publication privée Cursor).
            </p>
          </div>
          <Link
            href="/"
            className="font-mono text-xs text-gh-muted hover:text-gh-text"
          >
            ← Portfolio
          </Link>
        </div>

        {authorized ? (
          <CrmPanel initialProjects={projects} />
        ) : (
          <div className="rounded-md border border-gh-border bg-gh-surface p-8">
            <h2 className="font-mono text-lg font-semibold text-gh-text">
              Authentification requise
            </h2>
            <p className="mt-3 text-sm text-gh-muted">
              Connectez-vous via la publication privée de l’app pour gérer les
              projets. Les mutations API exigent aussi l’identité propriétaire.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
