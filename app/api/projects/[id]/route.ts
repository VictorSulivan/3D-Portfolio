import { requireOwner } from "@/lib/auth";
import { deleteProject, updateProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    return Response.json({ error: "Identifiant invalide." }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) {
    return Response.json({ error: "Le titre est requis." }, { status: 400 });
  }

  const project = await updateProject(id, {
    title,
    description: typeof body?.description === "string" ? body.description : "",
    url: typeof body?.url === "string" ? body.url : "",
    repo_url: typeof body?.repo_url === "string" ? body.repo_url : "",
    tags: typeof body?.tags === "string" ? body.tags : "",
    featured: Boolean(body?.featured),
    sort_order:
      typeof body?.sort_order === "number" ? body.sort_order : undefined,
  });

  if (!project) {
    return Response.json({ error: "Projet introuvable." }, { status: 404 });
  }

  return Response.json(
    { project },
    { headers: { "cache-control": "private, no-store" } },
  );
}

export async function DELETE(_request: Request, { params }: Params) {
  const owner = await requireOwner(_request);
  if (owner instanceof Response) return owner;

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    return Response.json({ error: "Identifiant invalide." }, { status: 400 });
  }

  const ok = await deleteProject(id);
  if (!ok) {
    return Response.json({ error: "Projet introuvable." }, { status: 404 });
  }

  return new Response(null, {
    status: 204,
    headers: { "cache-control": "private, no-store" },
  });
}
