# Waypoint

Waypoint is an AI job application copilot. It reads a job posting,
checks it against a candidate's verified profile — résumé, work history,
skills, and portfolio — and returns a scored fit analysis, tailored
application materials, and a tracker for the pipeline that follows.

Every strength or draft it produces is tied back to something specific on
file (a role, a dated résumé line, a named project). Gaps are named
plainly instead of papered over. Nothing is invented.

## What's here right now

- **Landing page** — product overview and entry points.
- **Job-fit analysis** (`/analyze`) — paste a job posting and get a scored
  breakdown (skills, experience level, domain, tooling), matched
  strengths with evidence, honestly-stated gaps, and draft materials
  (résumé bullets, a cover-letter opening, a sample application answer).
- **Application tracker** (`/tracker`) — every tracked application by
  stage, response-rate and pipeline stats computed live from the data,
  a recommended-next-action list, and per-application follow-up drafts.

All of the above currently runs on realistic fixture data in
`src/data/fixtures.ts` — there's no database or AI backend wired up yet.
See `PLAN.md` for what comes next.

## Tech

TanStack Start (React 19 + TanStack Router), Vite 7, Tailwind CSS 4,
Chart.js, TypeScript — deployed on Netlify.

## Running locally

```bash
npm install
npm run dev
```

Or with the Netlify CLI, for full platform emulation:

```bash
netlify dev
```

## Roadmap

See `PLAN.md` for the milestones ahead: persistence, the verified
profile and document ingestion, the AI-powered fit-analysis engine,
materials generation, the tracker backend, and follow-up/interview-prep
automation.
