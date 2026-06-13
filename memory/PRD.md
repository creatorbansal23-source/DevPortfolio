# Deepak Bansal — 3D Portfolio (PRD)

## Original Problem Statement
Immersive 3D portfolio for Deepak Bansal (Senior Software Engineer, 4+ yrs, C#/.NET/Azure/AI). Showcases resume + GitHub. Hero, About, Skills, Projects, Experience, Awards, Contact. React Three Fiber. Polished, production-ready, responsive.

## Architecture
- **Backend**: FastAPI + Motor (async MongoDB). Routes under `/api`: `health`, `profile`, `github/repos` (cached + fallback), `POST/GET contact`.
- **Frontend**: React 18, React Three Fiber, Drei, Three.js, Framer Motion, Tailwind, lucide-react, axios.

## Design System
Industrial Swiss / dark. `#050505` ink, `#FF3B30` vermilion accent. Cabinet Grotesk (display), Manrope (body), JetBrains Mono (overlines). 1px hairline borders. Fluid `clamp()` typography. Film-grain overlay.

## Iterations
- **i1**: MVP — backend, R3F HeroScene + SkillsConstellation, all 6 sections, MongoDB-persisted contact form, GitHub proxy.
- **i2**: Code-quality refactor — stable keys, extracted sub-components & custom hooks (`useGithubRepos`, `useContactForm`).
- **i3**: Creative redesign + full responsiveness — `AnimatedCounter` KPI rail, `LiveStatusPill`, `WhoamiTerminal`, `ContactSignal`, fluid breakpoints, 3D gated to `lg:`.
- **i4 — SkillsConstellation core**: replaced static red icosahedron with animated atomic nucleus (wireframe shell, faceted core, halo, glowing center, orbital rings, electrons, pulsing connector lines, breathing node dots).
- **i5 — Netflix-inspired picks** (from ravileshportfolio.netlify.app):
  - **`IntroOverlay`** — "Who's exploring?" first-visit overlay with 3 personas (Recruiter / Engineer / Just exploring). Auto-scrolls flow on selection (chained `setTimeout`). Persists via `localStorage` (`deepak-portfolio:intro-seen-v1`). Skippable. Re-openable via footer `↻ replay intro`. Body-scroll locked while open.
  - **`ContinueWatchingRail`** — 6-card horizontal scroll-snap rail (Backend 94%, Cloud 88%, Data 82%, AI 78%, Frontend 80%, Quality 90%) with category badge, icon, blurb, color-coded proficiency bar, tech chips, and prev/next pager arrows.
  - **Top-3 Awards** — `AwardRow` refactored with giant outlined numerals (01/02/03) via `WebkitTextStroke` + a `TOP 3` red badge above the list.

## Testing
- i1 / i2 / i3 / i4 / i5: 100% backend + 100% frontend, zero regressions.

## Backlog
- **P1**: Real `Deepak_Resume.pdf` static asset + wire `hero-resume-button` to download.
- **P2**: Admin-key protected `GET /api/contact`.
- **P2**: Cal.com / Calendly inline booking next to contact form.
- **P2**: Analytics (Plausible / PostHog) — visit-to-contact funnel.
- **P3**: Project case-study modals, OG/SEO meta polish.
- **P3**: Click-to-filter projects from Skills constellation labels.

## Next Action Items
- Host real resume PDF and wire download.
- Optional admin-key on contact list endpoint before public deploy.
