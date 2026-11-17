import { readViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const identity = await readViewer(request);
  if (!identity.verified || identity.kind !== "person") {
    return Response.json(
      { authenticated: false },
      { headers: { "cache-control": "private, no-store" } },
    );
  }

  return Response.json(
    {
      authenticated: true,
      name: identity.name,
      email: identity.email,
      appVisibility: identity.appVisibility,
      simulated: Boolean(identity.simulated),
    },
    { headers: { "cache-control": "private, no-store" } },
  );
}
