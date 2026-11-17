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
    <main className="min-h-screen bg-atmosphere px-6 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-brass-400">
              CRM privé
            </p>
            <h1 className="mt-2 font-display text-4xl text-mist-50">
              Gestion des projets
            </h1>
            <p className="mt-2 text-mist-200/80">
              Accès réservé au propriétaire (publication privée Cursor).
            </p>
          </div>
          <Link href="/" className="text-sm text-moss-400 hover:text-moss-400/80">
            ← Portfolio
          </Link>
        </div>

        {authorized ? (
          <CrmPanel initialProjects={projects} />
        ) : (
          <div className="rounded-sm border border-brass-400/30 bg-ink-900/60 p-8">
            <h2 className="font-display text-2xl text-mist-50">
              Authentification requise
            </h2>
            <p className="mt-3 text-mist-200/80">
              Connectez-vous via la publication privée de l’app pour gérer les
              projets. Les mutations API exigent aussi l’identité propriétaire.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
