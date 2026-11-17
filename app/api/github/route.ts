import { fetchGithubPortfolio } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await fetchGithubPortfolio();
  return Response.json(data, {
    headers: {
      "cache-control":
        data.source === "github"
          ? "public, s-maxage=300, stale-while-revalidate=600"
          : "no-store",
    },
  });
}
