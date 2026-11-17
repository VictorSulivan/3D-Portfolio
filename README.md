# Portfolio — Mathéo Guillemin

Portfolio professionnel (Next.js + Tailwind) avec :

- vitrine publique (hero, compétences, parcours, contact)
- projets CRM persistés en Postgres (PGlite en local)
- listing GitHub du compte **VictorSulivan** + organisations associées
- CRM admin `/admin` protégé par Cursor Identity (publication **privée**, owner only)

## Node.js (Vercel)

Le runtime est piné à **26.x** via le dépôt (pas de champ Node dans `vercel.json` — non supporté) :

- `package.json` → `"engines": { "node": "26.x" }` (prioritaire sur les Project Settings)
- `.nvmrc` / `.node-version` → `26`

Si un build affiche encore Node 20.x, vérifiez que le déploiement cible bien le tip de branche (pas un ancien SHA), puis en secours : Vercel → Project Settings → Build and Deployment → **Node.js Version = 26.x**.

## Développement

```bash
npm install
env -u DATABASE_URL npm run dev
```

Ouvrir [http://127.0.0.1:3000](http://127.0.0.1:3000).  
Admin local : identité simulée privée (`cursor/identity.dev.js`).

## Variables

| Variable | Usage |
| --- | --- |
| `DATABASE_URL` | Postgres production (fourni par publish-app) |
| `GITHUB_USERNAME` | Défaut `VictorSulivan` |
| `GITHUB_TOKEN` | Optionnel, pour remonter les limites API |

Ne jamais committer de secrets. En local, laissez `DATABASE_URL` non défini pour PGlite.

## Publication Cursor

1. Publier en **privé** (owner only) pour le CRM.
2. La plateforme provisionne Postgres via `cursor-app.json` + `migrations/`.
3. Les routes `/api/projects` (écriture) et `/admin` exigent une identité personne.
