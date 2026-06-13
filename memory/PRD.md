# Deepak Bansal — 3D Portfolio (PRD)

## Original Problem Statement
Build a fully functional, immersive 3D portfolio website for Deepak Bansal, Senior Software Engineer (4+ years, C#/.NET/Azure/AI). Showcases his profile from `Deepak_Resume.pdf` and GitHub (https://github.com/creatorbansal23-source) — quantified achievements (40% throughput, 25% tech-debt reduction, 99.9% uptime, 10,000+ users), education, awards. Sections: hero, about, skills, projects, experience timeline, awards, contact, social. React Three Fiber preferred. Polished, production-ready, responsive across mobile / tablet / desktop.

## Architecture
- **Backend**: FastAPI (Python) + Motor (async MongoDB). All routes under `/api`.
  - `GET /api/health`, `GET /api/profile`, `GET /api/github/repos` (cached + graceful fallback), `POST /api/contact`, `GET /api/contact`.
- **Frontend**: React 18 + React Three Fiber + Drei + Three.js + Framer Motion + Tailwind + lucide-react + axios.
- **Database**: MongoDB collection `contact_messages`.

## Design System
Swiss / high-contrast / industrial dark theme.
- Palette: `#050505` ink, `#121212` surface, `#FFFFFF` text, `#FF3B30` vermilion accent.
- Typography: Cabinet Grotesk (display), Manrope (body), JetBrains Mono (overlines).
- 1px hairline borders, sharp corners, fluid `clamp()` typography, film-grain overlay.

## Implemented

### Iteration 1 (2026-01)
- Full backend + frontend MVP, R3F HeroScene and SkillsConstellation, all 6 sections, MongoDB-persisted contact form, GitHub repos proxy.

### Iteration 2 — Code-quality refactor
- Stable React keys throughout; extracted `StatTile`, `TimelineItem`, `AwardRow`, `ProjectCard`, `useGithubRepos`, `useContactForm`, `ContactInfo`, `ContactForm`, `StatusBanner`, `Field` sub-components; removed dead imports; CRA builds clean.

### Iteration 3 — Creative redesign + full responsiveness
- **Hero**: replaced absolute-positioned stats bento with an in-flow editorial KPI rail using `AnimatedCounter` (IntersectionObserver-driven count-up, prefers-reduced-motion aware) + a new pulsing `LiveStatusPill`. 3D scene gated behind `lg:` (desktop only) with a crisp grid-pattern fallback for tablet/mobile so text legibility always wins.
- **About**: replaced 2x2 info tiles with `WhoamiTerminal` — a typing-style terminal block (`whoami`, `cat current.role`, `ls stack/`, `echo $LOCATION`, `cat open_to.txt`).
- **Contact**: replaced "Response time / Availability" 2-up with `ContactSignal` — LIVE pulsing pill + rotating "NOW SHIPPING" focus line + 4 structured signal rows (status / reply window / time zone / best fit).
- **Marquee**: slimmer, slower (60s), lighter opacity, smaller font.
- **Responsiveness**: fluid `clamp()` typography in all section H2s; responsive padding (`px-5 sm:px-8 md:px-12 lg:px-20`); mobile-aware timeline with vertical line + nodes; project card flex-min-w-0; contact form/info stacks at `lg`; 3D constellation height scales (`h-[360px] sm:h-[460px] md:h-[560px] lg:h-[680px]`); long emails/usernames `break-all`.

### Testing
- Iteration 1: 100% backend (7/7 pytest) + 100% frontend e2e.
- Iteration 2: 100% / 100% regression.
- Iteration 3: 100% / 100% — no horizontal scroll at 390/820/1440; all old + new testids verified; contact form persists.

## User Personas
- **Recruiter / hiring manager** — quick proof of impact, contactability, mobile-first.
- **Engineering peer** — project quality, source code links, stack credibility.

## Backlog
- **P1**: Real `Deepak_Resume.pdf` as static asset; wire `hero-resume-button` to download it.
- **P2**: Admin-key protection for `GET /api/contact`.
- **P2**: Cal.com / Calendly inline booking next to contact form (recruiter conversion lever).
- **P2**: Analytics (Plausible / PostHog) — visit-to-contact funnel.
- **P3**: Project case-study modals, OG image + SEO meta polish.

## Next Action Items
- Host static resume PDF and wire download button.
- Optional admin auth for contact list endpoint before public deploy.
