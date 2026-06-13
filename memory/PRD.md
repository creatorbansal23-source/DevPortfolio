# Deepak Bansal — 3D Portfolio (PRD)

## Original Problem Statement
Build a fully functional, immersive 3D portfolio website for Deepak Bansal, Senior Software Engineer (4+ years, C#/.NET/Azure/AI). Must showcase his profile from `Deepak_Resume.pdf` and GitHub (https://github.com/creatorbansal23-source) — including quantified achievements (40% throughput, 25% tech-debt reduction, 99.9% uptime, 10,000+ users), education, awards. Sections: hero, about, skills, projects, experience timeline, awards, contact, social. React Three Fiber preferred. Polished, production-ready, responsive.

## Architecture
- **Backend**: FastAPI (Python) + Motor (async MongoDB). All routes under `/api`.
  - `GET /api/health` — DB ping
  - `GET /api/profile` — static profile JSON (skills, exp, awards, projects, stats)
  - `GET /api/github/repos` — proxied live GitHub repos (10-min in-memory cache, graceful fallback to curated list)
  - `POST /api/contact` — validate + persist contact message
  - `GET /api/contact` — list submissions (newest first)
- **Frontend**: React 18 + React Three Fiber + Drei + Three.js + Framer Motion + Tailwind + lucide-react + axios.
- **Database**: MongoDB collection `contact_messages`.

## Design System
Swiss / high-contrast / industrial dark theme (per `/app/design_guidelines.json`).
- Palette: `#050505` ink, `#121212` surface, `#FFFFFF` text, `#FF3B30` vermilion accent.
- Typography: Cabinet Grotesk (display), Manrope (body), JetBrains Mono (overlines/stats).
- 1px hairline borders, sharp corners, generous negative space, film-grain overlay.

## Implemented (2026-01)
- [x] Backend: FastAPI app, contact form persistence, profile endpoint, GitHub repos proxy with fallback.
- [x] R3F HeroScene: floating microservices node cluster with red accents.
- [x] R3F SkillsConstellation: draggable tech-stack sphere (24 technologies).
- [x] Sections: Nav (sticky + mobile menu), Hero (with stats), About (with marquee), Skills, Projects (4 cards, live GitHub data), Experience (timeline + awards + education), Contact (form + social).
- [x] data-testid coverage on every interactive element.
- [x] Responsive layout (12-col grid → stacked at md breakpoint).
- [x] Backend pytest suite (7 tests, 100% pass).
- [x] Frontend end-to-end tested (100% pass) — nav, forms, validation, mobile menu, 3D canvas presence, contact submission persistence.

## User Personas
- **Recruiter / hiring manager** — wants quick proof of impact, tech depth, contactability.
- **Engineering peer** — wants to see project quality, source code, and stack credibility.

## Backlog
- **P1**: Resume PDF download button (currently scrolls to experience). Could host `/Deepak_Resume.pdf` as static asset.
- **P2**: Analytics (Plausible / PostHog) — track visit-to-contact funnel for the recruiter use case.
- **P2**: Admin route protected by a simple key to view `/api/contact` submissions.
- **P3**: Project case-study deep dives (modal or sub-route per project).
- **P3**: Light-mode toggle (current design is dark-only by intent).
- **P3**: SEO meta + OG image generation.

## Next Action Items
- Optionally swap fallback GitHub data once outbound network is consistently available in preview.
- Add real Resume PDF asset and wire `hero-resume-button` to download it.
