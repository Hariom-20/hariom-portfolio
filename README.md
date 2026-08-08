# Hariom Sharma — Portfolio

A premium, cinematic portfolio for **Hariom Sharma**, Full Stack Web Developer (MERN Stack). Dark, glossy, glass-morphic UI with CSS/Canvas-based 3D interactions — built for performance (respects `prefers-reduced-motion`, lightens effects on mobile).

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom design tokens)
- **Framer Motion** (reveal, parallax, magnetic buttons, 3D tilt, animated counters)
- Canvas particle system + CSS 3D transforms (no heavy WebGL bundle)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Build & run production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  layout.tsx        # fonts, metadata, Open Graph, SEO
  page.tsx          # section assembly + JSON-LD structured data
  globals.css       # design system: glass, grain, ambient glows
  icon.svg          # favicon
components/
  Navbar  Hero  HeroScene  About  Experience
  Projects  BrowserMockup  Services  TechStack
  Education  Contact  Footer  Loader
  ui/               # Reveal, MagneticButton, TiltCard, Counter,
                    # Particles, CursorGlow, SectionHeading, ScrollProgress
lib/
  data.ts           # single source of truth (from résumé)
```

## Editing content

All copy, experience, projects and links live in [`lib/data.ts`](lib/data.ts).

- **Project links:** `demoUrl` / `githubUrl` are `null` and render as clearly-marked
  "Soon" placeholders. Add real URLs there to activate the Live Demo / GitHub buttons.
- Update `siteUrl` in [`app/layout.tsx`](app/layout.tsx) and `page.tsx` JSON-LD once a
  domain is live.

## Deployment

Optimized for **Vercel** — push to a Git repo and import, or:

```bash
npm i -g vercel && vercel
```

## Notes

- Content is drawn strictly from the résumé — no fabricated companies, metrics or clients.
- Browser mockups in the Projects section are decorative CSS illustrations, not screenshots.
```
