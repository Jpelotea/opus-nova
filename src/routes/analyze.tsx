import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  fitAnalysis,
  sampleJobPosting,
  verifiedProfile,
} from '@/data/fixtures'

export const Route = createFileRoute('/analyze')({
  component: AnalyzePage,
})

type Status = 'idle' | 'loading' | 'done'

const MATERIAL_TABS = ['Résumé bullets', 'Cover letter', 'Application answer'] as const
type MaterialTab = (typeof MATERIAL_TABS)[number]

function AnalyzePage() {
  const [posting, setPosting] = useState(sampleJobPosting)
  const [status, setStatus] = useState<Status>('idle')
  const [tab, setTab] = useState<MaterialTab>('Résumé bullets')
  const [copied, setCopied] = useState<string | null>(null)

  function runAnalysis() {
    setStatus('loading')
    window.setTimeout(() => setStatus('done'), 1100)
  }

  function copy(label: string, text: string) {
    void navigator.clipboard?.writeText(text)
    setCopied(label)
    window.setTimeout(() => setCopied(null), 1600)
  }

  return (
    <div className="min-h-screen bg-paper px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="font-data text-xs uppercase tracking-[0.25em] text-clay-deep">
          Job-fit analysis
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          What does this role actually need from you?
        </h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Paste a posting below. It gets checked against {verifiedProfile.name}&rsquo;s
          verified profile — {verifiedProfile.yearsExperience} years of work
          history, {verifiedProfile.portfolioProjects.length} portfolio
          projects, résumé updated {formatDate(verifiedProfile.resumeUpdatedOn)}.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg text-ink">Job posting</h2>
              <span className="font-data text-[11px] uppercase tracking-[0.1em] text-ink/40">
                pasted text
              </span>
            </div>
            <textarea
              value={posting}
              onChange={(e) => setPosting(e.target.value)}
              rows={16}
              className="mt-4 w-full resize-none rounded-xl border border-paper-line bg-paper p-4 font-body text-sm leading-relaxed text-ink/80 focus:border-brass focus:outline-none"
            />
            <button
              onClick={runAnalysis}
              disabled={status === 'loading' || posting.trim().length === 0}
              className="mt-5 w-full rounded-full bg-ink px-6 py-3 font-data text-sm uppercase tracking-[0.12em] text-parchment transition-colors hover:bg-ink-soft disabled:opacity-50"
            >
              {status === 'loading' ? 'Analyzing…' : 'Analyze fit'}
            </button>
            <p className="mt-4 text-xs text-ink/45">
              Matched against: {verifiedProfile.workHistory.length} verified
              roles, {verifiedProfile.skills.length} listed skills,{' '}
              {verifiedProfile.portfolioProjects.length} portfolio projects.
            </p>
          </div>

          <div>
            {status === 'idle' && <EmptyState />}
            {status === 'loading' && <LoadingState />}
            {status === 'done' && (
              <ResultsState
                tab={tab}
                setTab={setTab}
                copied={copied}
                copy={copy}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-paper-line px-10 text-center">
      <div className="mb-4 h-10 w-10 rounded-full border border-paper-line" />
      <p className="font-display text-lg text-ink/70">
        Nothing analyzed yet
      </p>
      <p className="mt-2 max-w-sm text-sm text-ink/50">
        Analyze the posting on the left to see a fit score, matched
        strengths, honest gaps, and draft materials appear here.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6 rounded-2xl border border-paper-line bg-white/60 p-6">
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 animate-pulse-soft rounded bg-paper-line" />
        <div className="h-8 w-16 animate-pulse-soft rounded bg-paper-line" />
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 w-24 animate-pulse-soft rounded bg-paper-line" />
          <div className="h-1.5 w-full animate-pulse-soft rounded-full bg-paper-line" />
        </div>
      ))}
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full animate-pulse-soft rounded bg-paper-line" />
        <div className="h-3 w-5/6 animate-pulse-soft rounded bg-paper-line" />
        <div className="h-3 w-2/3 animate-pulse-soft rounded bg-paper-line" />
      </div>
    </div>
  )
}

function ResultsState({
  tab,
  setTab,
  copied,
  copy,
}: {
  tab: MaterialTab
  setTab: (t: MaterialTab) => void
  copied: string | null
  copy: (label: string, text: string) => void
}) {
  const a = fitAnalysis
  return (
    <div className="animate-rise space-y-6">
      <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-data text-[11px] uppercase tracking-[0.1em] text-ink/45">
              {a.company}
            </p>
            <p className="font-display text-lg text-ink">{a.role}</p>
          </div>
          <p className="font-display text-4xl text-clay-deep">
            {a.overallScore}%
          </p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {a.breakdown.map((b) => (
            <div key={b.label}>
              <div className="mb-1 flex justify-between font-data text-[11px] uppercase tracking-[0.1em] text-ink/45">
                <span>{b.label}</span>
                <span>{b.score}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-paper-line">
                <div
                  className="h-1.5 rounded-full bg-clay-deep"
                  style={{ width: `${b.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
        <h3 className="font-display text-base text-ink">
          Strengths, with evidence
        </h3>
        <ul className="mt-4 space-y-4">
          {a.strengths.map((s) => (
            <li key={s.title} className="border-l-2 border-sage-deep pl-4">
              <p className="text-sm text-ink/80">{s.title}</p>
              <p className="mt-1 font-data text-[11px] uppercase tracking-[0.08em] text-sage-deep">
                {s.evidence}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
        <h3 className="font-display text-base text-ink">Gaps, named plainly</h3>
        <ul className="mt-4 space-y-4">
          {a.gaps.map((g) => (
            <li key={g.title} className="border-l-2 border-clay-deep pl-4">
              <p className="text-sm text-ink/80">{g.title}</p>
              <p className="mt-1 text-xs text-ink/50">{g.suggestion}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
        <div className="flex flex-wrap gap-2">
          {MATERIAL_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 font-data text-xs uppercase tracking-[0.08em] transition-colors ${
                tab === t
                  ? 'bg-ink text-parchment'
                  : 'bg-paper text-ink/50 hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5">
          {tab === 'Résumé bullets' && (
            <ul className="space-y-4">
              {a.resumeBullets.map((b) => (
                <li key={b.text}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-ink/80">{b.text}</p>
                    <button
                      onClick={() => copy(b.text, b.text)}
                      className="shrink-0 font-data text-[11px] uppercase tracking-[0.08em] text-brass-bright hover:underline"
                    >
                      {copied === b.text ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="mt-1 font-data text-[11px] uppercase tracking-[0.08em] text-ink/40">
                    Grounded in: {b.groundedIn}
                  </p>
                </li>
              ))}
            </ul>
          )}
          {tab === 'Cover letter' && (
            <div>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed text-ink/80">
                  {a.coverLetterOpening.text}
                </p>
                <button
                  onClick={() =>
                    copy(a.coverLetterOpening.text, a.coverLetterOpening.text)
                  }
                  className="shrink-0 font-data text-[11px] uppercase tracking-[0.08em] text-brass-bright hover:underline"
                >
                  {copied === a.coverLetterOpening.text ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="mt-2 font-data text-[11px] uppercase tracking-[0.08em] text-ink/40">
                Grounded in: {a.coverLetterOpening.groundedIn}
              </p>
            </div>
          )}
          {tab === 'Application answer' && (
            <div>
              <p className="font-data text-[11px] uppercase tracking-[0.08em] text-ink/45">
                {a.applicationAnswer.prompt}
              </p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed text-ink/80">
                  {a.applicationAnswer.text}
                </p>
                <button
                  onClick={() =>
                    copy(a.applicationAnswer.text, a.applicationAnswer.text)
                  }
                  className="shrink-0 font-data text-[11px] uppercase tracking-[0.08em] text-brass-bright hover:underline"
                >
                  {copied === a.applicationAnswer.text ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="mt-2 font-data text-[11px] uppercase tracking-[0.08em] text-ink/40">
                Grounded in: {a.applicationAnswer.groundedIn}
              </p>
            </div>
          )}
        </div>
      </div>

      <Link
        to="/tracker"
        className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 font-data text-sm uppercase tracking-[0.12em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-brass-bright"
      >
        Save to tracker →
      </Link>
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
