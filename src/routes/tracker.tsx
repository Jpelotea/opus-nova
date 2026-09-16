import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  applications,
  STAGE_LABEL,
  STAGE_ORDER,
  type Stage,
  type TrackedApplication,
} from '@/data/fixtures'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const Route = createFileRoute('/tracker')({
  component: TrackerPage,
})

const STAGE_STYLE: Record<Stage, string> = {
  saved: 'bg-ink/10 text-ink/60',
  applied: 'bg-brass/20 text-brass-bright',
  screening: 'bg-clay/20 text-clay-deep',
  interviewing: 'bg-sage/25 text-sage-deep',
  offer: 'bg-sage-deep/90 text-parchment',
  rejected: 'bg-ink/40 text-parchment',
}

const STAGE_CHART_COLOR: Record<Stage, string> = {
  saved: '#b8ae98',
  applied: '#c68a46',
  screening: '#b5573a',
  interviewing: '#6e8b7a',
  offer: '#4c6857',
  rejected: '#2a2419',
}

function TrackerPage() {
  const [filter, setFilter] = useState<Stage | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const stats = useMemo(() => computeStats(applications), [])
  const stageCounts = useMemo(() => {
    const counts = new Map<Stage, number>()
    for (const stage of STAGE_ORDER) counts.set(stage, 0)
    for (const app of applications) counts.set(app.stage, (counts.get(app.stage) ?? 0) + 1)
    return counts
  }, [])

  const visible =
    filter === 'all' ? applications : applications.filter((a) => a.stage === filter)

  const priorityActions = useMemo(
    () =>
      [...applications]
        .filter((a) => a.stage !== 'rejected')
        .sort(
          (a, b) =>
            new Date(a.lastActivityOn).getTime() - new Date(b.lastActivityOn).getTime(),
        )
        .slice(0, 3),
    [],
  )

  return (
    <div className="min-h-screen bg-paper px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="font-data text-xs uppercase tracking-[0.25em] text-clay-deep">
          Application tracker
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          Every application, one pipeline.
        </h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          {stats.total} tracked, {stats.responseRate}% response rate on the{' '}
          {stats.appliedCount} you&rsquo;ve actually submitted.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile label="Tracked" value={String(stats.total)} />
          <StatTile label="Response rate" value={`${stats.responseRate}%`} />
          <StatTile label="Active conversations" value={String(stats.active)} />
          <StatTile
            label="Median days to first response"
            value={String(stats.medianDays)}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
            <h2 className="font-display text-base text-ink">Recommended next</h2>
            <ul className="mt-4 space-y-4">
              {priorityActions.map((a) => (
                <li key={a.id} className="border-l-2 border-brass pl-4">
                  <p className="text-sm text-ink/80">
                    {a.company} — {a.role}
                  </p>
                  <p className="mt-1 text-xs text-ink/50">{a.nextAction}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-paper-line bg-white/60 p-6">
            <h2 className="font-display text-base text-ink">By stage</h2>
            <div className="mt-4 h-48">
              <Bar
                data={{
                  labels: STAGE_ORDER.map((s) => STAGE_LABEL[s]),
                  datasets: [
                    {
                      data: STAGE_ORDER.map((s) => stageCounts.get(s) ?? 0),
                      backgroundColor: STAGE_ORDER.map((s) => STAGE_CHART_COLOR[s]),
                      borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { beginAtZero: true, ticks: { stepSize: 1 } },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <FilterPill
            label={`All (${applications.length})`}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {STAGE_ORDER.map((s) => (
            <FilterPill
              key={s}
              label={`${STAGE_LABEL[s]} (${stageCounts.get(s) ?? 0})`}
              active={filter === s}
              onClick={() => setFilter(s)}
            />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {visible.map((app) => (
            <ApplicationRow
              key={app.id}
              app={app}
              open={openId === app.id}
              onToggle={() => setOpenId(openId === app.id ? null : app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-paper-line bg-white/60 p-5">
      <p className="font-display text-2xl text-ink">{value}</p>
      <p className="mt-1 font-data text-[11px] uppercase tracking-[0.08em] text-ink/45">
        {label}
      </p>
    </div>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-data text-xs uppercase tracking-[0.08em] transition-colors ${
        active ? 'bg-ink text-parchment' : 'bg-white/60 text-ink/50 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

function ApplicationRow({
  app,
  open,
  onToggle,
}: {
  app: TrackedApplication
  open: boolean
  onToggle: () => void
}) {
  const canDraft = app.stage !== 'saved'
  return (
    <div className="rounded-2xl border border-paper-line bg-white/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg text-ink">{app.company}</p>
          <p className="text-sm text-ink/60">{app.role}</p>
          <p className="mt-1 font-data text-[11px] uppercase tracking-[0.08em] text-ink/40">
            {app.location} · {app.source}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full px-3 py-1 font-data text-[11px] uppercase tracking-[0.08em] ${STAGE_STYLE[app.stage]}`}
          >
            {STAGE_LABEL[app.stage]}
          </span>
          <span className="font-data text-[11px] text-ink/40">
            {app.appliedOn ? `Applied ${formatDate(app.appliedOn)}` : 'Not yet applied'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-paper-line pt-3">
        <p className="text-sm text-ink/70">{app.nextAction}</p>
        {canDraft && (
          <button
            onClick={onToggle}
            className="shrink-0 font-data text-[11px] uppercase tracking-[0.08em] text-brass-bright hover:underline"
          >
            {open ? 'Hide draft' : 'Draft message'}
          </button>
        )}
      </div>

      {open && canDraft && (
        <div className="mt-4 rounded-xl border border-paper-line bg-paper p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink/75">
            {draftMessage(app)}
          </p>
        </div>
      )}
    </div>
  )
}

function draftMessage(app: TrackedApplication): string {
  const applied = app.appliedOn ? formatDate(app.appliedOn) : 'recently'
  switch (app.stage) {
    case 'applied':
      return `Hi — I applied for the ${app.role} role on ${applied} and wanted to check in on where things stand. Happy to share anything else that would help move things along.`
    case 'screening':
      return `Thanks again for the call about the ${app.role} role. I wanted to follow up and see what the next step looks like, and whether there's anything else useful to send over before then.`
    case 'interviewing':
      return `Looking forward to the next conversation about the ${app.role} role. Let me know if there's anything specific you'd like me to prepare or bring with me.`
    case 'offer':
      return `Thank you for the offer for the ${app.role} role — I'm genuinely excited about it. I'd like to take a few days to review the details before confirming; could we set a date to follow up?`
    case 'rejected':
      return `Thanks for letting me know about the ${app.role} role. If you have a few minutes, I'd appreciate any feedback on where the fit didn't line up — it'd help me going forward.`
    default:
      return ''
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function computeStats(apps: TrackedApplication[]) {
  const total = apps.length
  const appliedCount = apps.filter((a) => a.stage !== 'saved').length
  const responded = apps.filter((a) => a.daysToFirstResponse !== null)
  const responseRate = appliedCount
    ? Math.round((responded.length / appliedCount) * 1000) / 10
    : 0
  const active = apps.filter((a) =>
    (['screening', 'interviewing', 'offer'] as Stage[]).includes(a.stage),
  ).length
  const days = responded
    .map((a) => a.daysToFirstResponse as number)
    .sort((a, b) => a - b)
  const medianDays = days.length
    ? days[Math.floor((days.length - 1) / 2)]
    : 0

  return { total, appliedCount, responseRate, active, medianDays }
}
