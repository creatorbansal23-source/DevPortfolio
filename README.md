# 🚀 Deepak Bansal — Developer Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A modern, animated 3D-style personal developer portfolio showcasing my projects, skills, experience, and contact information. Built with smooth scroll-driven animations, magnetic hover effects, and a dark-first aesthetic.

[Live Demo](#live-demo) · [Projects](#-projects) · [Contact](#-contact)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#live-demo)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Sections](#-sections)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 🧑‍💻 Overview

This portfolio is a fully responsive, scroll-animated developer portfolio for **Deepak Bansal** — a Senior Software Engineer with 4+ years of experience in C#, .NET Core, ASP.NET Core, React, and Azure cloud services.

The design is inspired by modern creative portfolios with a dark `#0C0C0C` theme, fluid typography using `clamp()`, Framer Motion scroll-driven animations, and sticky card-stacking effects. It is purpose-built to highlight enterprise-grade engineering work, AI/ML projects, and cloud architecture skills.

---

## Live Demo

> 🔗 Deploy link will be added here after hosting setup (e.g., Vercel / Netlify / GitHub Pages).

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **Build Tool** | Vite 5 |
| **Font** | Kanit (Google Fonts) |

---

## ✨ Features

- **Scroll-driven animations** — Framer Motion `useScroll` + `useTransform` power parallax, fade-in, and card stacking effects
- **Magnetic hover effect** — Hero avatar follows the cursor with a smooth spring-like magnetic response
- **Character-by-character text reveal** — About section text animates each character opacity on scroll
- **Sticky stacking cards** — Skills and Projects sections use a scroll-linked card stack that scales down as you scroll past
- **Tech stack marquee** — Two rows of technology pills scroll in opposite directions, tied to page scroll position
- **Fully responsive** — Mobile-first layout that scales from 375px to ultra-wide screens using fluid `clamp()` typography
- **Dark theme** — Consistent `#0C0C0C` dark background with gradient hero text and `#D7E2EA` accent color
- **Section-by-section content** — Hero, About, Experience, Skills, Projects, Awards, and Contact sections

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ or **yarn** v1.22+
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/creatorbansal23-source/DevPortfolio.git
cd DevPortfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in browser**

```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
DevPortfolio/
├── public/                  # Static assets (favicon, og images)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FadeIn.tsx       # Scroll-triggered fade animation wrapper
│   │   ├── Magnet.tsx       # Mouse-following magnetic effect
│   │   ├── AnimatedText.tsx # Character-by-character scroll reveal
│   │   ├── ContactButton.tsx
│   │   └── GitHubButton.tsx
│   ├── sections/            # Full-page sections
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── AwardsSection.tsx
│   │   └── ContactSection.tsx
│   ├── App.tsx              # Root component, section composition
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles, Tailwind directives
├── index.html               # HTML entry point (Kanit font loaded here)
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

---

## 📄 Sections

| Section | Description |
|---|---|
| **Hero** | Full-screen intro with animated name heading, magnetic avatar, and animated navbar |
| **Marquee** | Scroll-linked dual-row ticker of tech stack pills (C#, Azure, React, etc.) |
| **About** | Character-by-character scroll-reveal paragraph with decorative tech icons in corners |
| **Experience** | Timeline of roles at Coforge with key achievements and impact metrics |
| **Skills** | Four sticky-stacking cards covering Languages, Cloud, AI & Automation, and Tools |
| **Projects** | Three sticky-stacking project cards linking to GitHub repos (CarDamageEstimatorV2, DiagramAI, budget-planner) |
| **Awards** | Recognition from Coforge — PAT On The Back, Collaborator Award, Hackathon Winner |
| **Contact** | Email, phone, and GitHub links with a bold call-to-action heading |

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag and drop the /dist folder into Netlify's deployment UI
# or use the Netlify CLI:
netlify deploy --prod --dir=dist
```

### GitHub Pages

Update `vite.config.ts` to set the correct `base` path:

```ts
export default defineConfig({
  base: '/DevPortfolio/',
})
```

Then deploy using the `gh-pages` package:

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

---

## 📬 Contact

**Deepak Bansal** — Senior Software Engineer

- 📧 Email: [deepak23bansal1997@gmail.com](mailto:deepak23bansal1997@gmail.com)
- 📱 Phone: +91 09554399992
- 🐙 GitHub: [@creatorbansal23-source](https://github.com/creatorbansal23-source)
- 📍 Location: New Delhi, India

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ by [Deepak Bansal](https://github.com/creatorbansal23-source)

</div>
