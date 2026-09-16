# AGENTS.md

This document orients AI agents and developers working on this codebase.

## Project overview

OpusNova is an AI job application copilot. It analyzes a job posting
against a candidate's verified profile (résumé, work history, skills,
portfolio), scores the fit, drafts tailored application materials, and
tracks each application through its pipeline.

This milestone ships the branded product surface — the landing page, the
job-fit analysis screen, and the application tracker — running on fixture
data defined in `src/data/fixtures.ts`. There is no backend or database yet.
**Read `PLAN.md` before starting new work** — it lays out the milestones
that turn this surface into the full product (persistence, the verified
profile, the analysis engine, materials generation, and follow-ups).

### Tech stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 (file-based routing) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (theme tokens in `src/styles.css`) |
| Charts | Chart.js + react-chartjs-2 |
| Icons | lucide-react |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory structure

```
├── public/                  # Static assets (favicon, etc.)
├── src
│   ├── components
│   │   └── Header.tsx        # Sticky top nav: logo mark, route links, "New analysis" CTA
│   ├── data
│   │   └── fixtures.ts       # All stubbed demo data — applications, verified profile,
│   │                          # sample job posting, fit-analysis result. Swap for real
│   │                          # data access in a later milestone; keep the shapes stable
│   │                          # so route components don't need rework.
│   ├── routes
│   │   ├── __root.tsx         # Root shell: fonts, meta, Header
│   │   ├── index.tsx          # Landing page
│   │   ├── analyze.tsx        # Job-fit analysis screen
│   │   └── tracker.tsx        # Application tracker screen
│   ├── router.tsx             # TanStack Router setup
│   └── styles.css             # Tailwind import + @theme design tokens + animations
├── PLAN.md                   # Product roadmap / milestones beyond this surface
├── README.md
├── netlify.toml
└── vite.config.ts
```

## Design system

Defined via Tailwind v4 `@theme` tokens in `src/styles.css` — do not
hardcode hex colors in components; use the generated utilities:

- Colors: `ink`, `ink-soft`, `ink-raised`, `parchment`, `parchment-dim`,
  `brass`, `brass-bright`, `sage`, `sage-deep`, `clay`, `clay-deep`,
  `paper`, `paper-raised`, `paper-line`.
- Fonts: `font-display` (Fraunces, headlines), `font-body` (IBM Plex Sans,
  default body), `font-data` (IBM Plex Mono, labels/data/nav — used
  uppercase with wide tracking throughout).
- The landing page uses dark `ink` surfaces for drama; the analysis and
  tracker screens use light `paper` surfaces for data density. Same
  palette, different lightness — keep it that way rather than introducing
  a second color scheme.

## Key conventions

- Routes are file-based under `src/routes/` — see the
  `tanstack-start-routes` skill for naming conventions before adding pages.
- Fixture data types (`Stage`, `TrackedApplication`, `VerifiedProfile`,
  `FitAnalysis`) in `src/data/fixtures.ts` are written to look like the
  eventual database/API shapes. When wiring real persistence, prefer
  matching these shapes over redesigning them, so the UI needs minimal
  changes.
- Every piece of generated "material" (résumé bullet, cover letter,
  answer) in the fixtures carries a `groundedIn` field pointing at a
  specific verified-profile record. Preserve this pattern when the real
  analysis engine replaces the fixture — it's the mechanism that prevents
  fabricated qualifications, which is a core product requirement, not a
  cosmetic detail.
- Import paths use the `@/*` alias for `src/*`.
- No component library is installed (no Radix/shadcn) — UI primitives are
  plain Tailwind-styled elements local to each route file. Introduce a
  library only if a future milestone's UI complexity genuinely needs it.
