import { sql } from "./db";

export type PortfolioProject = {
  id: number;
  title: string;
  description: string;
  url: string;
  repo_url: string;
  tags: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const SEED: Array<{
  title: string;
  description: string;
  url: string;
  repo_url: string;
  tags: string;
  featured: boolean;
  sort_order: number;
}> = [
  {
    title: "Portfolio 3D Three.js",
    description:
      "Portfolio interactif avec scène 3D, navigation immersive et animations Spring.",
    url: "https://3-d-portfolio-jade-phi.vercel.app",
    repo_url: "https://github.com/VictorSulivan/3D-Portfolio",
    tags: "React,Three.js,Vite",
    featured: true,
    sort_order: 10,
  },
  {
    title: "Backend e-commerce Stripe",
    description:
      "API de paiement en Golang intégrant Stripe pour des flux checkout fiables.",
    url: "",
    repo_url: "https://github.com/VictorSulivan/StripeGoBackend",
    tags: "Go,Stripe,API",
    featured: true,
    sort_order: 20,
  },
  {
    title: "Clone WhatsApp fullstack",
    description:
      "Messagerie temps réel avec React, Node.js et MongoDB (en cours).",
    url: "",
    repo_url: "https://github.com/VictorSulivan/WhatsapClone",
    tags: "React,Node.js,MongoDB",
    featured: false,
    sort_order: 30,
  },
  {
    title: "Simulateur de distributeur (C)",
    description:
      "Programme terminal en C simulant les opérations bancaires essentielles.",
    url: "",
    repo_url: "https://github.com/VictorSulivan/ATM-Easy-C",
    tags: "C,CLI",
    featured: false,
    sort_order: 40,
  },
];

let seeded = false;

export async function ensureSeedProjects(): Promise<void> {
  if (seeded) return;
  const rows = await sql<{ count: string }>(
    "select count(*)::text as count from portfolio_projects",
  );
  const count = Number(rows[0]?.count ?? 0);
  if (count === 0) {
    for (const item of SEED) {
      await sql(
        `insert into portfolio_projects
          (title, description, url, repo_url, tags, featured, sort_order)
         values ($1, $2, $3, $4, $5, $6, $7)`,
        [
          item.title,
          item.description,
          item.url,
          item.repo_url,
          item.tags,
          item.featured,
          item.sort_order,
        ],
      );
    }
  }
  seeded = true;
}

export async function listProjects(): Promise<PortfolioProject[]> {
  await ensureSeedProjects();
  return sql<PortfolioProject>(
    `select id, title, description, url, repo_url, tags, featured, sort_order,
            created_at::text, updated_at::text
     from portfolio_projects
     order by sort_order asc, id desc`,
  );
}

export async function getProject(id: number): Promise<PortfolioProject | null> {
  await ensureSeedProjects();
  const rows = await sql<PortfolioProject>(
    `select id, title, description, url, repo_url, tags, featured, sort_order,
            created_at::text, updated_at::text
     from portfolio_projects
     where id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function createProject(input: {
  title: string;
  description?: string;
  url?: string;
  repo_url?: string;
  tags?: string;
  featured?: boolean;
  sort_order?: number;
}): Promise<PortfolioProject> {
  await ensureSeedProjects();
  const rows = await sql<PortfolioProject>(
    `insert into portfolio_projects
      (title, description, url, repo_url, tags, featured, sort_order, updated_at)
     values ($1, $2, $3, $4, $5, $6, $7, now())
     returning id, title, description, url, repo_url, tags, featured, sort_order,
               created_at::text, updated_at::text`,
    [
      input.title.trim(),
      (input.description ?? "").trim(),
      (input.url ?? "").trim(),
      (input.repo_url ?? "").trim(),
      (input.tags ?? "").trim(),
      Boolean(input.featured),
      Number.isFinite(input.sort_order) ? Number(input.sort_order) : 100,
    ],
  );
  return rows[0];
}

export async function updateProject(
  id: number,
  input: {
    title: string;
    description?: string;
    url?: string;
    repo_url?: string;
    tags?: string;
    featured?: boolean;
    sort_order?: number;
  },
): Promise<PortfolioProject | null> {
  await ensureSeedProjects();
  const rows = await sql<PortfolioProject>(
    `update portfolio_projects set
        title = $2,
        description = $3,
        url = $4,
        repo_url = $5,
        tags = $6,
        featured = $7,
        sort_order = $8,
        updated_at = now()
     where id = $1
     returning id, title, description, url, repo_url, tags, featured, sort_order,
               created_at::text, updated_at::text`,
    [
      id,
      input.title.trim(),
      (input.description ?? "").trim(),
      (input.url ?? "").trim(),
      (input.repo_url ?? "").trim(),
      (input.tags ?? "").trim(),
      Boolean(input.featured),
      Number.isFinite(input.sort_order) ? Number(input.sort_order) : 100,
    ],
  );
  return rows[0] ?? null;
}

export async function deleteProject(id: number): Promise<boolean> {
  await ensureSeedProjects();
  const rows = await sql<{ id: number }>(
    "delete from portfolio_projects where id = $1 returning id",
    [id],
  );
  return rows.length > 0;
}
