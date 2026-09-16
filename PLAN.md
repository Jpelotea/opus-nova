# OpusNova — product roadmap

Milestone 1 shipped the branded product surface: the landing page, the
job-fit analysis screen, and the application tracker, all running on
fixture data (`src/data/fixtures.ts`). Everything below turns that
surface into the real product.

## Milestone 1 — Product surface ✅

- Landing page, `/analyze`, `/tracker`, design system, fixture data.

## Milestone 2 — Data model & persistence

- Provision the Netlify database (Postgres via `@netlify/database` +
  Drizzle — see the `netlify-database` skill).
- Schema: `profiles`, `resumes`, `skills`, `work_experience`,
  `portfolio_projects`, `job_postings`, `applications`,
  `application_events` (status-change history), `generated_materials`,
  `follow_ups`.
- Keep the fixture types in `src/data/fixtures.ts` as the target shape —
  the route components should need minimal changes once real queries
  replace the fixture imports.

## Milestone 3 — Auth & verified profile

- Add account creation (Netlify Identity or a comparable auth flow) so a
  profile belongs to one person.
- Build the profile-input flow: résumé upload/paste, structured work
  history and skills entry, portfolio project entry, and — for anything
  used as "evidence" in an analysis — a provenance record (what source
  it came from, when it was confirmed) so the app can keep distinguishing
  verified fact from generated content.

## Milestone 4 — Job intake & fit-analysis engine

- Accept a job posting as pasted text or a URL (fetch + extract via a
  Netlify function for the URL case).
- Replace the fixture `fitAnalysis` with a real analysis: use the
  `netlify-ai-gateway` skill to call an LLM, but constrain it to only
  reference facts present in the stored verified profile — the
  `groundedIn` field on every output needs to point at a real record, not
  a model guess.
- Persist each analysis so it's retrievable from the tracker later.

## Milestone 5 — Tailored materials generation

- Generate résumé bullets, cover letters/intros, and application-question
  answers from the same grounded approach as the fit analysis.
- Add portfolio-project recommendations ranked by relevance to the
  specific posting.
- Let a user edit and save generated materials per application.

## Milestone 6 — Tracker backend

- Wire the "Save to tracker" action on `/analyze` to actually create an
  `applications` row from an analysis.
- Persist stage changes as `application_events` so response-time and
  outcome stats (currently computed from static fixtures) are computed
  from real history.
- Recompute "recommended next actions" from real staleness/urgency rather
  than fixture ordering.

## Milestone 7 — Follow-ups & interview prep

- Turn the current client-side `draftMessage()` template in
  `src/routes/tracker.tsx` into AI-generated, context-aware drafts.
- Add scheduled reminders (Netlify Scheduled Functions) for stale
  applications and upcoming interviews.
- Add an interview-prep brief per application, grounded in the job
  posting and the stored fit analysis.

## Milestone 8 — Delivery & polish

- Export generated materials (résumé section, cover letter) as
  copy-ready or downloadable documents.
- Outcome analytics: which materials/approaches correlate with
  advancing further in a pipeline.
- Notification delivery (email) for reminders and status nudges.
