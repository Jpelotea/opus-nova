// Stubbed demo data for the product-surface milestone. A later milestone
// replaces this module with data read from the Netlify database — see
// PLAN.md. Nothing here should be treated as a real API contract.

export type Stage =
  | 'saved'
  | 'applied'
  | 'screening'
  | 'interviewing'
  | 'offer'
  | 'rejected'

export const STAGE_LABEL: Record<Stage, string> = {
  saved: 'Saved',
  applied: 'Applied',
  screening: 'Screening',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
}

export const STAGE_ORDER: Stage[] = [
  'saved',
  'applied',
  'screening',
  'interviewing',
  'offer',
  'rejected',
]

export interface TrackedApplication {
  id: string
  company: string
  role: string
  location: string
  stage: Stage
  source: string
  appliedOn: string | null
  lastActivityOn: string
  daysToFirstResponse: number | null
  nextAction: string
}

export const applications: TrackedApplication[] = [
  {
    id: 'fenwick-grid',
    company: 'Fenwick Grid Co.',
    role: 'Senior Data Platform Engineer',
    location: 'Remote (US)',
    stage: 'interviewing',
    source: 'Referral — Priyanka M.',
    appliedOn: '2026-08-04',
    lastActivityOn: '2026-09-10',
    daysToFirstResponse: 9,
    nextAction: 'Final panel Sep 24 — prep the backpressure/incident case study',
  },
  {
    id: 'harborlight-health',
    company: 'Harborlight Health',
    role: 'Product Designer, Clinical Tools',
    location: 'Portland, OR (hybrid)',
    stage: 'screening',
    source: 'Job board',
    appliedOn: '2026-08-22',
    lastActivityOn: '2026-09-05',
    daysToFirstResponse: 6,
    nextAction: 'Recruiter screen complete — nudge for a hiring-manager slot',
  },
  {
    id: 'aldergrove-robotics',
    company: 'Aldergrove Robotics',
    role: 'Embedded Systems Engineer',
    location: 'Fremont, CA (onsite)',
    stage: 'rejected',
    source: 'Company site',
    appliedOn: '2026-07-14',
    lastActivityOn: '2026-08-01',
    daysToFirstResponse: 12,
    nextAction: 'Closed — request feedback before archiving',
  },
  {
    id: 'quillwork-studio',
    company: 'Quillwork Studio',
    role: 'Backend Engineer, Payments',
    location: 'Remote (EU overlap)',
    stage: 'applied',
    source: 'Referral — Dev O.',
    appliedOn: '2026-09-09',
    lastActivityOn: '2026-09-09',
    daysToFirstResponse: null,
    nextAction: 'No response yet — follow up around Sep 23',
  },
  {
    id: 'northbound-labs',
    company: 'Northbound Labs',
    role: 'Developer Relations Engineer',
    location: 'Remote',
    stage: 'saved',
    source: 'Job board',
    appliedOn: null,
    lastActivityOn: '2026-09-14',
    daysToFirstResponse: null,
    nextAction: 'Draft tailored materials before applying',
  },
  {
    id: 'palisade-systems',
    company: 'Palisade Systems',
    role: 'Site Reliability Engineer',
    location: 'Austin, TX (hybrid)',
    stage: 'offer',
    source: 'Referral — Wren T.',
    appliedOn: '2026-07-28',
    lastActivityOn: '2026-09-12',
    daysToFirstResponse: 11,
    nextAction: 'Offer in hand — compare comp and respond by Sep 19',
  },
  {
    id: 'lumen-cartography',
    company: 'Lumen Cartography',
    role: 'Frontend Engineer, Maps Platform',
    location: 'Remote',
    stage: 'applied',
    source: 'Job board',
    appliedOn: '2026-08-30',
    lastActivityOn: '2026-08-30',
    daysToFirstResponse: null,
    nextAction: 'No response in 17 days — follow up is overdue',
  },
  {
    id: 'ferro-dynamics',
    company: 'Ferro Dynamics',
    role: 'Machine Learning Engineer, Forecasting',
    location: 'Denver, CO (onsite)',
    stage: 'interviewing',
    source: 'Job board',
    appliedOn: '2026-08-11',
    lastActivityOn: '2026-09-08',
    daysToFirstResponse: 8,
    nextAction: 'Take-home exercise due Sep 18',
  },
]

export interface VerifiedProfile {
  name: string
  headline: string
  resumeUpdatedOn: string
  yearsExperience: number
  workHistory: { role: string; company: string; span: string }[]
  portfolioProjects: { name: string; context: string }[]
  skills: string[]
}

export const verifiedProfile: VerifiedProfile = {
  name: 'Simone Achterberg',
  headline: 'Data platform engineer, streaming & analytics infrastructure',
  resumeUpdatedOn: '2026-08-02',
  yearsExperience: 6.5,
  workHistory: [
    {
      role: 'Data Platform Engineer',
      company: 'Cinder Analytics',
      span: '2022 – present',
    },
    {
      role: 'Software Engineer',
      company: 'Basalt Freight',
      span: '2019 – 2022',
    },
  ],
  portfolioProjects: [
    {
      name: 'Realtime Ingestion Pipeline',
      context: 'Cinder Analytics, 2023',
    },
    {
      name: 'Backpressure-aware Event Bus',
      context: 'Open-source side project, 2024',
    },
    {
      name: 'Grid Load Forecast Dashboard',
      context: 'Contract for Ferro Dynamics, 2025',
    },
  ],
  skills: [
    'Apache Kafka',
    'dbt',
    'Python',
    'Kubernetes (operating clusters)',
    'Terraform',
    'SQL',
    'Airflow',
    'Go',
    'Snowflake',
  ],
}

export const sampleJobPosting = `Senior Data Platform Engineer — Streaming Systems
Anchorline Data · Remote (US/Canada) · Full-time

Anchorline Data runs the ingestion layer behind a handful of multi-tenant
analytics products, processing in the neighborhood of 40 billion events a
day across several thousand tenants. We're hiring a senior engineer to help
scale that layer past its current architecture.

What you'd own:
- Design and operate our core Kafka and dbt-based transformation pipelines
- Author and maintain Kubernetes operators for our stream-processing workloads
  (not just running clusters — building the operators themselves)
- Lead capacity planning and incident response for the streaming platform
- Mentor two mid-level engineers joining the team this quarter
- Partner with the analytics team on multi-tenant isolation guarantees

What we're looking for:
- 5+ years operating production streaming/event infrastructure at scale
- Deep hands-on Kafka experience; dbt or comparable transformation tooling
- Experience authoring Kubernetes operators or controllers (strong plus)
- Prior experience mentoring or leading engineers (plus)
- Comfort with on-call rotation for a multi-tenant, always-on system`

export interface FitAnalysis {
  company: string
  role: string
  overallScore: number
  breakdown: { label: string; score: number }[]
  strengths: { title: string; evidence: string }[]
  gaps: { title: string; suggestion: string }[]
  resumeBullets: { text: string; groundedIn: string }[]
  coverLetterOpening: { text: string; groundedIn: string }
  applicationAnswer: {
    prompt: string
    text: string
    groundedIn: string
  }
}

export const fitAnalysis: FitAnalysis = {
  company: 'Anchorline Data',
  role: 'Senior Data Platform Engineer, Streaming Systems',
  overallScore: 81,
  breakdown: [
    { label: 'Skills', score: 86 },
    { label: 'Experience level', score: 77 },
    { label: 'Domain', score: 72 },
    { label: 'Tooling', score: 91 },
  ],
  strengths: [
    {
      title: 'Multi-year track record running production Kafka pipelines at scale',
      evidence: 'Cinder Analytics — Data Platform Engineer, 2022–present',
    },
    {
      title: "Built and owns the team's dbt transformation layer end to end",
      evidence: 'Cinder Analytics — Realtime Ingestion Pipeline',
    },
    {
      title: 'Comfortable operating and capacity-planning Kubernetes clusters under load',
      evidence: 'Résumé — updated Aug 2, 2026',
    },
    {
      title: 'Direct exposure to forecasting-style streaming workloads',
      evidence: 'Portfolio — Grid Load Forecast Dashboard (Ferro Dynamics contract)',
    },
  ],
  gaps: [
    {
      title:
        'The posting wants someone who has authored Kubernetes operators. Experience so far is operating and tuning clusters, not building operators.',
      suggestion:
        'Name this directly rather than implying it — mention the adjacent experience and ask about ramp-up expectations in the first conversation.',
    },
    {
      title: 'No documented experience formally mentoring or leading other engineers.',
      suggestion:
        'If informal mentoring has happened, it needs to be verified and added to the profile before it can appear in materials.',
    },
    {
      title:
        "Anchorline's scale (40B events/day, multi-tenant isolation) is larger than anything in the verified work history.",
      suggestion:
        'Frame this as a deliberate step up rather than a like-for-like match — the interview is the place to show the reasoning ability, not a fabricated scale claim.',
    },
  ],
  resumeBullets: [
    {
      text: 'Operated and tuned a multi-broker Kafka cluster handling roughly 2.1B events/day, including capacity planning and on-call incident response.',
      groundedIn: 'Cinder Analytics — Data Platform Engineer',
    },
    {
      text: 'Designed the dbt transformation layer powering downstream analytics for 30+ internal consumers, cutting pipeline failure rate by about a third.',
      groundedIn: 'Cinder Analytics — Realtime Ingestion Pipeline',
    },
    {
      text: 'Built a load-forecasting dashboard translating streaming sensor data into hourly grid forecasts for a utility-scale operator, under contract.',
      groundedIn: 'Portfolio — Grid Load Forecast Dashboard',
    },
  ],
  coverLetterOpening: {
    text: "I've spent the last three years running the Kafka and dbt pipelines behind Cinder Analytics' ingestion layer — the kind of always-on, multi-tenant system Anchorline is describing, just at a smaller scale. I haven't authored Kubernetes operators myself, but I've operated and tuned the clusters they run on closely enough to know exactly where that role earns its keep, and I'd rather say that plainly than dress it up.",
    groundedIn: 'Cinder Analytics — Data Platform Engineer',
  },
  applicationAnswer: {
    prompt: 'Describe a time you diagnosed a difficult production issue.',
    text: "A backpressure cascade in our Kafka consumer group started dropping downstream dbt runs silently overnight. I traced it to a single misconfigured consumer that was holding partition offsets too long under load, isolated it, and rebalanced the group without a full pipeline restart. Afterward I added lag-based alerting so the same failure mode would surface in minutes instead of a support ticket the next morning.",
    groundedIn: 'Cinder Analytics — Realtime Ingestion Pipeline incident response',
  },
}
