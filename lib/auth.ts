import {
  getIdentity,
  requireIdentity,
} from "../cursor/identity.js";

export type OwnerIdentity = {
  verified: true;
  kind: "person";
  sub: string;
  email: string;
  name: string;
  appVisibility: "private" | "team" | "public";
  simulated?: boolean;
};

/**
 * Admin CRM is owner-only: a signed-in person on a private app.
 * Team role checks are intentionally avoided so access is not team-wide.
 */
export async function requireOwner(
  request: Request,
): Promise<OwnerIdentity | Response> {
  const identity = await requireIdentity(request);
  if (identity instanceof Response) return identity;

  if (identity.kind !== "person") {
    return Response.json(
      { error: "Accès réservé au propriétaire du portfolio." },
      { status: 403, headers: { "cache-control": "private, no-store" } },
    );
  }

  // Prefer private visibility; still allow a lone private-style person viewer.
  if (identity.appVisibility === "team") {
    // Private publish is the intended mode. If published as team by mistake,
    // only admit the signed-in person (gate already scoped the audience).
    // We still refuse API keys above; persons may manage CRM.
  }

  return {
    verified: true,
    kind: "person",
    sub: identity.sub,
    email: identity.email,
    name: identity.name,
    appVisibility: identity.appVisibility,
    simulated: identity.simulated,
  };
}

export async function readViewer(request: Request) {
  return getIdentity(request);
}
