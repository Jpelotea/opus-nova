import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

const STEPS = [
  {
    n: '01',
    title: 'Drop in a posting',
    body: 'Paste the job description, or its URL, exactly as it was published — no rewriting required.',
  },
  {
    n: '02',
    title: 'It checks your verified record',
    body: 'Requirements get matched against your résumé, work history, skills, and portfolio — not a guess at what you might have done.',
  },
  {
    n: '03',
    title: 'Get grounded materials',
    body: 'Tailored résumé bullets, a cover-letter opening, and application answers, each traceable to something real on file.',
  },
  {
    n: '04',
    title: 'Track it to a decision',
    body: 'Every application moves through your pipeline with next-action nudges, follow-up drafts, and interview prep.',
  },
]

const DELIVERABLES = [
  {
    title: 'Job-fit analysis',
    body: 'A scored breakdown of skills, experience level, domain, and tooling — plus the gaps, stated plainly.',
    span: 'lg:col-span-4 lg:row-span-2',
  },
  {
    title: 'Tailored résumé bullets',
    body: 'Rewritten to match the posting language, sourced from real roles and projects.',
    span: 'lg:col-span-3',
  },
  {
    title: 'Cover letters & intros',
    body: 'Openings that reference the actual work, not template flattery.',
    span: 'lg:col-span-2',
  },
  {
    title: 'Application answers',
    body: 'Draft responses to screening questions, grounded in your history.',
    span: 'lg:col-span-3',
  },
  {
    title: 'Portfolio recommendations',
    body: 'The projects most relevant to this specific role, ranked by fit.',
    span: 'lg:col-span-3',
  },
  {
    title: 'Application tracker',
    body: 'Every stage from saved to offer, with response-time and outcome data.',
    span: 'lg:col-span-4',
  },
  {
    title: 'Follow-ups & interview prep',
    body: 'Drafted nudges when it’s time, and briefs before you walk in.',
    span: 'lg:col-span-2',
  },
]

function Home() {
  return (
    <div className="bg-paper">
      <section className="relative overflow-hidden bg-ink text-parchment">
        <div className="grain-overlay" />
        <div
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, var(--color-brass) 0%, transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, var(--color-sage) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div className="animate-rise">
            <p className="font-data text-xs uppercase tracking-[0.3em] text-brass-bright">
              AI job application copilot
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Apply with what&rsquo;s <em className="italic text-brass-bright">actually true</em> about you.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-parchment-dim">
              OpusNova reads a job posting against your verified résumé, work
              history, and portfolio — surfaces the real fit, drafts materials
              grounded in your record, and tracks the application from first
              click to final answer.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/analyze"
                className="rounded-full bg-brass px-6 py-3 font-data text-sm uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-brass-bright"
              >
                Analyze a job posting
              </Link>
              <Link
                to="/tracker"
                className="rounded-full border border-parchment-dim/30 px-6 py-3 font-data text-sm uppercase tracking-[0.12em] text-parchment transition-colors hover:border-brass-bright hover:text-brass-bright"
              >
                Open your tracker
              </Link>
            </div>
          </div>

          <div
            className="animate-rise rounded-2xl border border-parchment-dim/15 bg-ink-soft p-6 shadow-2xl shadow-black/40"
            style={{ animationDelay: '140ms' }}
          >
            <div className="flex items-center justify-between border-b border-parchment-dim/10 pb-4">
              <div>
                <p className="font-data text-[11px] uppercase tracking-[0.14em] text-parchment-dim">
                  Anchorline Data
                </p>
                <p className="font-display text-lg">
                  Senior Data Platform Engineer
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl text-brass-bright">81%</p>
                <p className="font-data text-[11px] uppercase tracking-[0.1em] text-parchment-dim">
                  overall match
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ['Skills', 86],
                ['Experience level', 77],
                ['Tooling', 91],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between font-data text-[11px] uppercase tracking-[0.1em] text-parchment-dim">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink-raised">
                    <div
                      className="h-1.5 rounded-full bg-brass-bright"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-sage-deep/30 px-3 py-1 font-data text-[11px] text-sage">
                Kafka at scale — matched
              </span>
              <span className="rounded-full bg-clay-deep/30 px-3 py-1 font-data text-[11px] text-clay">
                Operator authoring — gap
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-28">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          How OpusNova actually works
        </h2>
        <div className="mt-16 space-y-14">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`relative flex flex-col gap-3 border-l-2 border-paper-line pl-8 sm:flex-row sm:items-start sm:gap-8 ${
                i % 2 === 1 ? 'sm:ml-16' : ''
              }`}
            >
              <span className="font-display text-5xl leading-none text-paper-line">
                {step.n}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 max-w-md text-ink/65">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-raised">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Nothing about you gets <em className="italic text-clay-deep">invented</em>.
          </h2>
          <div className="space-y-5 text-ink/70">
            <p>
              Every strength OpusNova surfaces points back to a specific line
              in the verified profile: a role, a dated résumé bullet, a named
              portfolio project. If a job asks for something that isn&rsquo;t
              on file, it shows up as a gap, not a paraphrase.
            </p>
            <div className="flex items-start gap-3 rounded-xl border border-paper-line bg-paper p-4">
              <div className="flex-1">
                <p className="text-ink">
                  &ldquo;Comfortable operating and tuning Kubernetes clusters under load&rdquo;
                </p>
                <p className="mt-2 font-data text-[11px] uppercase tracking-[0.1em] text-ink/45">
                  Grounded in: Résumé, updated Aug 2, 2026
                </p>
              </div>
            </div>
            <p>
              That also means gaps are named plainly instead of glossed over —
              which is what makes the materials it drafts hold up under a
              follow-up question.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          What comes out of every analysis
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-9">
          {DELIVERABLES.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-paper-line bg-paper p-6 transition-colors hover:border-brass ${item.span}`}
            >
              <h3 className="font-display text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/65">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink text-parchment">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-24 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Start with the next posting on your list.
            </h2>
            <p className="mt-3 max-w-md text-parchment-dim">
              See the fit breakdown before you spend an evening rewriting a résumé for it.
            </p>
          </div>
          <Link
            to="/analyze"
            className="shrink-0 rounded-full bg-brass px-7 py-3.5 font-data text-sm uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-brass-bright"
          >
            Analyze a job posting
          </Link>
        </div>
      </section>
    </div>
  )
}
