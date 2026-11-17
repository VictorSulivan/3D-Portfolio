export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  source: "user" | "org";
  owner_login: string;
  updated_at: string;
};

export type GithubFetchResult = {
  username: string;
  orgs: string[];
  repos: GithubRepo[];
  source: "github" | "fallback";
  message?: string;
};

const USERNAME = process.env.GITHUB_USERNAME?.trim() || "VictorSulivan";

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: "3D-Portfolio",
    full_name: "VictorSulivan/3D-Portfolio",
    description: "Portfolio 3D avec Three.js",
    html_url: "https://github.com/VictorSulivan/3D-Portfolio",
    homepage: "https://3-d-portfolio-jade-phi.vercel.app",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["portfolio", "threejs"],
    source: "user",
    owner_login: "VictorSulivan",
    updated_at: "2025-02-04T10:23:19Z",
  },
  {
    id: 2,
    name: "StripeGoBackend",
    full_name: "VictorSulivan/StripeGoBackend",
    description: "Backend e-commerce Stripe en Golang",
    html_url: "https://github.com/VictorSulivan/StripeGoBackend",
    homepage: null,
    language: "Go",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["go", "stripe"],
    source: "user",
    owner_login: "VictorSulivan",
    updated_at: "2024-12-01T00:00:00Z",
  },
  {
    id: 3,
    name: "WhatsapClone",
    full_name: "VictorSulivan/WhatsapClone",
    description: "Clone WhatsApp fullstack",
    html_url: "https://github.com/VictorSulivan/WhatsapClone",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["react", "nodejs"],
    source: "user",
    owner_login: "VictorSulivan",
    updated_at: "2024-11-01T00:00:00Z",
  },
  {
    id: 4,
    name: "ATM-Easy-C",
    full_name: "VictorSulivan/ATM-Easy-C",
    description: "Simulateur de distributeur en C",
    html_url: "https://github.com/VictorSulivan/ATM-Easy-C",
    homepage: null,
    language: "C",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["c"],
    source: "user",
    owner_login: "VictorSulivan",
    updated_at: "2024-10-01T00:00:00Z",
  },
];

type GhRepoJson = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  owner: { login: string };
  updated_at: string;
  private?: boolean;
};

async function ghFetch(url: string): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "matheo-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { headers, next: { revalidate: 300 } });
}

async function fetchAllRepos(
  baseUrl: string,
): Promise<{ ok: true; repos: GhRepoJson[] } | { ok: false; status: number }> {
  const repos: GhRepoJson[] = [];
  for (let page = 1; page <= 5; page += 1) {
    const sep = baseUrl.includes("?") ? "&" : "?";
    const res = await ghFetch(
      `${baseUrl}${sep}per_page=100&page=${page}&sort=updated`,
    );
    if (!res.ok) return { ok: false, status: res.status };
    const batch = (await res.json()) as GhRepoJson[];
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return { ok: true, repos };
}

function mapRepo(repo: GhRepoJson, source: "user" | "org"): GithubRepo {
  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    topics: repo.topics ?? [],
    source,
    owner_login: repo.owner.login,
    updated_at: repo.updated_at,
  };
}

export async function fetchGithubPortfolio(): Promise<GithubFetchResult> {
  try {
    const userRes = await fetchAllRepos(
      `https://api.github.com/users/${USERNAME}/repos`,
    );
    if (!userRes.ok) {
      return {
        username: USERNAME,
        orgs: [],
        repos: FALLBACK_REPOS,
        source: "fallback",
        message:
          userRes.status === 403
            ? "Limite API GitHub atteinte — liste de secours affichée."
            : `GitHub indisponible (${userRes.status}) — liste de secours.`,
      };
    }

    const orgsRes = await ghFetch(
      `https://api.github.com/users/${USERNAME}/orgs?per_page=100`,
    );
    let orgLogins: string[] = [];
    if (orgsRes.ok) {
      const orgs = (await orgsRes.json()) as Array<{ login: string }>;
      orgLogins = orgs.map((o) => o.login);
    }

    const orgRepoLists = await Promise.all(
      orgLogins.map(async (login) => {
        const result = await fetchAllRepos(
          `https://api.github.com/orgs/${login}/repos`,
        );
        if (!result.ok) return [] as GithubRepo[];
        return result.repos
          .filter((r) => !r.private && !r.fork)
          .map((r) => mapRepo(r, "org"));
      }),
    );

    const userRepos = userRes.repos
      .filter((r) => !r.private && !r.fork)
      .map((r) => mapRepo(r, "user"));

    const byId = new Map<number, GithubRepo>();
    for (const repo of [...userRepos, ...orgRepoLists.flat()]) {
      byId.set(repo.id, repo);
    }

    const repos = [...byId.values()].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );

    return {
      username: USERNAME,
      orgs: orgLogins,
      repos,
      source: "github",
    };
  } catch {
    return {
      username: USERNAME,
      orgs: [],
      repos: FALLBACK_REPOS,
      source: "fallback",
      message: "Erreur réseau GitHub — liste de secours affichée.",
    };
  }
}
