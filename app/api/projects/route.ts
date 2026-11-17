import { requireOwner } from "@/lib/auth";
import { createProject, listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await listProjects();
  return Response.json(
    { projects },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const owner = await requireOwner(request);
  if (owner instanceof Response) return owner;

  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) {
    return Response.json({ error: "Le titre est requis." }, { status: 400 });
  }

  const project = await createProject({
    title,
    description: typeof body?.description === "string" ? body.description : "",
    url: typeof body?.url === "string" ? body.url : "",
    repo_url: typeof body?.repo_url === "string" ? body.repo_url : "",
    tags: typeof body?.tags === "string" ? body.tags : "",
    featured: Boolean(body?.featured),
    sort_order:
      typeof body?.sort_order === "number" ? body.sort_order : undefined,
  });

  return Response.json(
    { project },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
}
