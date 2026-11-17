create table if not exists portfolio_projects (
  id bigserial primary key,
  title text not null,
  description text not null default '',
  url text not null default '',
  repo_url text not null default '',
  tags text not null default '',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_projects_sort_idx
  on portfolio_projects (sort_order asc, id desc);
