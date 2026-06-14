# Design System Manifest: Swiss & High-Contrast

This document defines the brand, layout conventions, color palette, and component constraints for the portfolio project. It is intended for both human developers and AI design agents (like Google Stitch) to maintain complete visual consistency across the codebase.

---

## 1. Overview & Visual Philosophy
* **Vibe**: Tech-forward, mature, industrial, and brutalist.
* **Core Principle**: Swiss minimalism. Dense technical data clusters contrasted with large areas of negative space. Avoid center-aligned layouts; use structured, left-aligned, asymmetry.
* **Structural Framing**: Use visible gridlines and fine borders to partition sections, creating a "control room" aesthetic. All corners must be completely sharp (no border-radius).

---

## 2. Color Tokens
| Token | HEX / CSS Value | Application |
| :--- | :--- | :--- |
| **Background (Ink)** | `#050505` | Master screen background |
| **Surface** | `#121212` | Solid component cards, containers, panels |
| **Surface Glass** | `rgba(18, 18, 18, 0.75)` | Floating navigation, overlays, blur backdrops |
| **Primary Text** | `#FFFFFF` | Main headlines, body copy, active text |
| **Secondary Text** | `#888888` | Muted labels, paragraphs, inactive text |
| **Accent (Vermilion)** | `#FF3B30` | Interactive states, call-to-actions, status signals |
| **Border (Hairline)** | `rgba(255, 255, 255, 0.1)` | 1px grid borders, dividers, card boundaries |

---

## 3. Typography
We use a clean, highly functional typographic scale:

### 3.1 Display Font (Headings)
* **Family**: `Cabinet Grotesk` (fallback: `Space Grotesk`, `sans-serif`)
* **Weight**: `800` (Extra Bold)
* **Tracking**: `tracking-tightest` (`-0.04em`)
* **Usage**: Massive, architectural headlines (H1/H2). Should have strong vertical presence.

### 3.2 Body Font
* **Family**: `Manrope` (fallback: `sans-serif`)
* **Weight**: `400` (Regular)
* **Tracking**: `normal`
* **Usage**: Standard paragraphs, bullet points, narrative flow blocks.

### 3.3 Monospaced Labels
* **Family**: `JetBrains Mono` (fallback: `monospace`)
* **Weight**: `500` (Medium)
* **Tracking**: `tracking-[0.2em]`
* **Format**: All-caps (`uppercase`), thin typography.
* **Usage**: UI overlines, statistics, command line text, indicators, and dates.

---

## 4. Spacing & Layout Constraints
* **Grid Architecture**: Enforce a strict 12-column grid system (`grid-cols-12`) using Tailwind.
* **Borders**: Expose section boundaries using a 1px solid border utility class `.hairline` (`border-color: rgba(255,255,255,0.1)`).
* **Card Gaps**: Use grid margins combined with a border-color separation instead of traditional margins to draw pixel-perfect divider grids.
* **Padding Scales**:
  * Containers: `px-5 sm:px-8 md:px-12 lg:px-20`
  * Vertical Spacing: `py-16 sm:py-20 md:py-28 lg:py-32`
* **Corners**: Completely sharp. Set Tailwind `rounded-none` on all elements (cards, buttons, inputs).

---

## 5. UI Components

### 5.1 Interactive Buttons
* **Shape**: Rectangular, sharp edges (`rounded-none`).
* **Primary State**: White background (`#FFFFFF`), ink-black text (`#050505`).
* **Hover State**: Transition dynamically to Vermilion (`#FF3B30`) background and white text.
* **Secondary State**: Transparent background with a 1px hairline border, white text. Hover transitions to white border and solid background.

### 5.2 Input & Form Fields
* **Body**: Pure black background (`#000000` or `#050505`), 1px white/20 border.
* **Focus State**: Replace default browser focus with a sharp 1px Vermilion (`#FF3B30`) border outline.
* **Labels**: Rendered as monospaced, gray uppercase text (`.mono-label`) stacked above the input field.

### 5.3 Card Containers
* **Body**: Flat background (`#121212`), 1px solid hairline border. No box-shadows.
* **Hover State**: Border transitions smoothly to white/40 (`border-white/40`).

---

## 6. Motion & WebGL Gating
* **Scroll Animations**: Subtle scroll-driven reveals using Framer Motion. Use smooth, non-bouncy cubic-bezier curves (e.g., `ease: [0.16, 1, 0.3, 1]`).
* **3D Viewport Performance**: WebGL canvasses (`HeroScene` and `SkillsConstellation`) must be disabled on screens below the desktop breakpoint (`lg` / `1024px`) to conserve GPU frame rates and prevent scrolling interruptions. Render static grid CSS layouts as a fallback.
