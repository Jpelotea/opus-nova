import { Link } from '@tanstack/react-router'

const NAV_LINKS = [
  { to: '/analyze' as const, label: 'Job-fit analysis' },
  { to: '/tracker' as const, label: 'Tracker' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-parchment-dim/15 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-parchment"
        >
          <OpusNovaMark />
          <span className="font-display text-xl italic tracking-tight">
            OpusNova
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full px-4 py-2 font-data text-xs uppercase tracking-[0.14em] text-parchment-dim transition-colors hover:text-brass-bright [&.active]:text-brass-bright"
              activeProps={{ className: 'active' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/analyze"
            className="ml-2 rounded-full bg-brass px-4 py-2 font-data text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-brass-bright"
          >
            New analysis
          </Link>
        </nav>
      </div>
    </header>
  )
}

function OpusNovaMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="13"
        cy="13"
        r="11.5"
        stroke="currentColor"
        className="text-parchment-dim/40"
      />
      <path d="M13 3 L13 8" stroke="var(--color-brass-bright)" strokeWidth="1.6" />
      <path d="M13 18 L13 23" stroke="var(--color-brass-bright)" strokeWidth="1.6" />
      <path d="M3 13 L8 13" stroke="var(--color-brass-bright)" strokeWidth="1.6" />
      <path d="M18 13 L23 13" stroke="var(--color-brass-bright)" strokeWidth="1.6" />
      <path
        d="M13 7 L17.5 13 L13 19 L8.5 13 Z"
        fill="var(--color-brass-bright)"
      />
    </svg>
  )
}
