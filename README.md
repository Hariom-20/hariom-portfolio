# Hariom Sharma — Portfolio

A premium, cinematic personal portfolio for **Hariom Sharma**, Full Stack Web
Developer (MERN Stack). Dark, glossy, glassmorphic UI with layered 3D depth,
cursor-driven parallax and smooth motion — engineered to feel like a high-end
modern product site, not a template.

🔗 **Live:** https://hariom-portfolio-mu.vercel.app
📦 **Repo:** https://github.com/Hariom-20/hariom-portfolio

---

## ✨ Highlights

- **HR / Tech audience toggle** — one switch reshapes the whole site: HR gets a
  recruiter-friendly, plain-language view; Tech gets the full technical detail
  (code panels, stack constellation, deep case studies). Choice is saved to
  `localStorage`.
- **Layered floating-glass hero** — frosted panels at different depths with true
  cursor parallax, staggered entrance and hover-to-spread (desktop).
- **Interactive everywhere** — magnetic buttons, 3D tilt cards, animated
  counters, a scroll-illuminated experience timeline, a tech-pill constellation,
  and a magnetic "Connect" orb.
- **Performance-minded** — no heavy WebGL; all 3D is CSS transforms + a light
  canvas particle field. Fully static output, ~148 kB First Load JS.
- **Accessible & responsive** — respects `prefers-reduced-motion`, works from
  mobile to desktop, semantic HTML, keyboard-navigable, SEO + Open Graph +
  JSON-LD structured data.

---

## 🧱 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) | Static export, routing, metadata/SEO, image + font optimization |
| **Language** | [TypeScript](https://www.typescriptlang.org) | Type-safe components and a typed content model |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) v3 | Utility-first styling with a custom dark/glass design token set |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Reveal, parallax, magnetic buttons, tilt, counters, layout animations |
| **3D / FX** | CSS 3D transforms + `<canvas>` particles | Depth and gloss **without** shipping a Three.js/WebGL bundle |
| **Fonts** | Inter via `next/font` | Modern, self-hosted, zero layout shift |
| **Hosting** | [Vercel](https://vercel.com) | First-class Next.js hosting + instant deploys from GitHub |
| **Version control** | Git + GitHub | Source of truth; Vercel deploys from `main` |

> No Three.js, no chart libraries, no UI kit — the visuals (glass panels, area
> chart, browser mockups, particles) are all hand-built with CSS/SVG/Canvas to
> keep the bundle small and the look bespoke.

---

## 🚀 Getting Started

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev          # → http://localhost:3000

# 3. production build + run
npm run build
npm run start
```

Requires **Node.js 18+**.

---

## 🗂️ Project Structure

```
app/
  layout.tsx          # <html>, fonts, metadata, Open Graph, theme, PersonaProvider
  page.tsx            # section assembly + JSON-LD structured data
  globals.css         # design system: glass utilities, grain, ambient glows, tokens
  icon.svg            # favicon

components/
  Navbar.tsx          # sticky frosted nav, scroll-spy, mobile menu, persona toggle
  Hero.tsx            # animated headline, CTAs, status, hero visual
  HeroScene.tsx       # perspective stage + cursor parallax for the hero visual
  HeroPanels.tsx      # the floating layered-glass composition (dashboard/code/status/badge)
  About.tsx           # editorial intro + interactive stats
  Experience.tsx      # alternating zig-zag timeline with a scroll-illuminated rail
  Projects.tsx        # large case-study project rows
  BrowserMockup.tsx   # decorative CSS browser UIs for the projects
  Services.tsx        # "What I build" large-type interactive list
  TechStack.tsx       # tech constellation (Tech) / grouped skills (HR)
  Education.tsx       # education + certification cards
  Contact.tsx         # dramatic CTA + magnetic Connect orb + channels
  Footer.tsx          # links, socials, résumé
  Loader.tsx          # brand intro loading animation
  PersonaContext.tsx  # HR/Tech state + localStorage persistence

  ui/
    PersonaToggle.tsx   # HR | Tech segmented control
    MagneticButton.tsx  # cursor-attracted button/link
    TiltCard.tsx        # 3D tilt-on-hover wrapper
    Reveal.tsx          # scroll-reveal (fade/slide/blur, optional x/y)
    Counter.tsx         # count-up-on-view number
    StatsGrid.tsx       # spotlight + icon stat tiles
    Particles.tsx       # canvas particle field (density scales down on mobile)
    CursorGlow.tsx      # pointer-following ambient glow (fine pointers only)
    SectionHeading.tsx  # eyebrow + title + description
    ScrollProgress.tsx  # top scroll-progress bar

lib/
  data.ts             # SINGLE SOURCE OF TRUTH — all content lives here

public/
  Hariom_Sharma_Resume.pdf   # the downloadable CV

vercel.json           # pins the Next.js framework preset
tailwind.config.ts    # colors, fonts, keyframes, shadows
```

---

## 🧭 How it was built (build flow)

The site was built iteratively, in clear phases:

1. **Scaffold** — Next.js + TypeScript + Tailwind + Framer Motion configured by
   hand (no `create-next-app` wizard) for full control over the setup.
2. **Design system first** — `globals.css` + `tailwind.config.ts` established the
   language up front: near-black background, soft-gray type, one restrained
   indigo/violet accent, glass surfaces, a fine grain overlay and ambient glows.
3. **Reusable primitives** — the `ui/` building blocks (Reveal, MagneticButton,
   TiltCard, Counter, Particles, etc.) so every section shares the same motion
   and material vocabulary.
4. **Content model** — everything factual was centralized in `lib/data.ts`,
   drawn **strictly from the résumé** (no invented companies, metrics or links).
5. **Sections** — Navbar → Hero → About → Experience → Projects → Services →
   Stack → Education → Contact → Footer, each composed from the primitives.
6. **The HR / Tech persona layer** — a context + toggle that swaps copy and
   hides/adds technical detail across sections, persisted to `localStorage`.
7. **Hero centerpiece** — iterated to a **floating layered-glass composition**
   (analytics panel + code panel + deploy chip + glossy badge) with real
   depth-based parallax.
8. **Polish & QA** — responsive tuning (verified with headless Chrome at phone
   width), reduced-motion support, an SEO/OG/JSON-LD pass, and a Next.js
   security patch.
9. **Ship** — pushed to GitHub and deployed to Vercel (production).

---

## ✏️ Editing content

**All copy, experience, projects, skills and links live in
[`lib/data.ts`](lib/data.ts).** Change it there and every section updates.

- **Experience / Projects / Skills** — typed arrays; edit text, dates, tags,
  links.
- **Project links** — set `demoUrl` / `githubUrl`. `null` renders a clearly
  labelled **"Soon"** placeholder instead of a fake link.
- **Persona copy** — `personaCopy` holds the HR vs Tech wording for each section.
- **Résumé** — replace `public/Hariom_Sharma_Resume.pdf` (keep the filename) to
  update the **Download CV** button.
- **Domain / SEO** — update `siteUrl` in [`app/layout.tsx`](app/layout.tsx) and
  the JSON-LD in [`app/page.tsx`](app/page.tsx) when a custom domain is live.

---

## 🎨 Design system

- **Palette** — `ink` near-blacks for surfaces; `accent` indigo/violet/blue for
  the single restrained accent (see `tailwind.config.ts`).
- **Glass** — `.glass` / `.glass-strong` utilities (translucent gradient +
  backdrop blur + hairline border), plus a `.sheen` reflective top edge.
- **Texture** — a fixed SVG **grain** overlay and layered **ambient glows** for
  depth; an optional faint grid in the hero.
- **Motion** — one shared easing (`[0.16, 1, 0.3, 1]`), gentle durations, and a
  global reduced-motion guard in `globals.css`.

---

## 🔀 The HR / Tech toggle

A small segmented control in the navbar (and mobile menu) switches the whole
experience:

| Section | **Tech** view | **HR** view |
|---|---|---|
| Hero | MERN-focused subtitle + floating code panel | Plain-language subtitle, no code panel |
| About | Technical stats | Career-focused stats |
| Stack | Interactive constellation | Clean grouped "Core skills" |
| Experience | Shows tech-stack tags | Tags hidden, live links kept |
| Projects | Full case study incl. Technology row | Technology detail hidden |

State is saved to `localStorage`, so a returning visitor keeps their view.

---

## ☁️ Deployment

Hosted on **Vercel**, deployed from the GitHub `main` branch.

```bash
# one-off deploy from the CLI
npm i -g vercel
vercel --prod
```

`vercel.json` pins `"framework": "nextjs"` so the build is detected correctly.
Connecting the GitHub repo in the Vercel dashboard enables **auto-deploy on
every push**.

---

## 📝 Notes

- Content is drawn **strictly from the résumé** — no fabricated companies,
  metrics, clients or achievements.
- The Projects **browser mockups** and the hero **analytics panel** are
  decorative CSS/SVG illustrations, not real screenshots or live data.
- Live proof links (Creasip & HypeRatings landing pages, the JobsInDelhiNCR
  portal) are real and open the actual sites.

---

© Hariom Sharma — Full Stack Web Developer (MERN Stack)
