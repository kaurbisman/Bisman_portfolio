# Development Plan
## Bisman Kaur Portfolio — Build Plan for Antigravity IDE (AI-Assisted)

This plan is written for building the site **inside Antigravity IDE**, using AI agent prompts to scaffold, generate, and iterate on the codebase. Each phase includes concrete AI prompts you can paste directly into the agent.

---

## 0. Prerequisites (Before Opening Antigravity)

1. Create accounts:
   - **Vercel** (hosting)
   - **Supabase** (database + auth + storage) — or alternative headless CMS if preferred
   - **GitHub** (repo for version control; Antigravity works well with a connected repo)
2. Gather assets from Bisman:
   - Profile photo (high-res)
   - Resume PDF
   - Certificate images/PDFs (IIT JAM, JGEEBILS, etc.)
   - Hackathon/event photos for gallery
   - Institution logos (IISER Pune, Bhaskaracharya College)
   - Bio text, exact dates for education entries
3. Decide final domain name (e.g., `bismankaur.com` or `bismankaur.in`).

---

## Phase 1 — Project Scaffolding (Day 1)

**Goal:** Working Next.js + TypeScript + Tailwind project with theme system in place.

**Steps:**
1. In Antigravity, create a new project: Next.js (App Router) + TypeScript + Tailwind CSS.
2. Install core dependencies: `framer-motion`, `@supabase/supabase-js`, `lucide-react`, `clsx`, `zod` (form validation).
3. Set up global CSS variables for the Liquid Glass theme (light/dark tokens from PRD Section 6.2).
4. Configure `next-themes` (or custom context) for dark/light mode toggle with system-preference detection.
5. Set up folder structure:
```
/app
  /(public)
    page.tsx            → home (all sections as scroll anchors or tabs)
  /admin
    layout.tsx
    page.tsx             → dashboard
    /education /skills /projects /certifications /achievements /gallery /messages /resume
  /api
    /contact
    /admin/[resource]
/components
  /ui        → GlassCard, Button, Tabs, Modal, Badge, ThemeToggle
  /sections  → Hero, About, Education, Skills, Projects, Certifications, Achievements, Gallery, Contact
/lib
  supabaseClient.ts
  schema.ts (zod schemas)
/styles
  globals.css (theme tokens)
```

**Sample AI prompt for Antigravity:**
> "Scaffold a Next.js 14 App Router project with TypeScript and Tailwind CSS. Add a global CSS variable-based theme system supporting light and dark mode with the following tokens: [paste Section 6.2 color table]. Add a ThemeToggle component using next-themes with an animated sun/moon SVG icon."

---

## Phase 2 — Design System & Reusable UI Components (Day 1–2)

**Goal:** Build the Liquid Glass component library before touching real content sections.

**Components to build:**
- `GlassCard` — reusable frosted panel with configurable blur/border/shadow
- `LiquidBackground` — animated gradient blob SVG/CSS background component
- `Navbar` — sticky tab navigation with active-section highlight, mobile hamburger with slide-out glass drawer
- `Button` (primary/secondary/ghost variants with hover ripple)
- `SectionHeading` — consistent heading style with animated underline/accent
- `Modal` / `Lightbox` — for project details & gallery
- `ProgressRing` / `SkillBar` — liquid-fill animated skill indicators
- `Timeline` — vertical/horizontal glass timeline for Education
- `Badge` — for achievements/certifications

**Sample AI prompt:**
> "Create a reusable `GlassCard` React component in TypeScript using Tailwind CSS that implements a frosted glass effect: backdrop-blur, semi-transparent background using CSS variables `--bg-glass` and `--border-glass`, rounded-2xl corners, and a subtle hover animation using Framer Motion that lifts the card (translateY -4px) and increases shadow intensity. It should support light and dark mode automatically via CSS variables."

---

## Phase 3 — Public Sections (Day 3–5)

Build section by section, each as its own component, wired to **static/mock data first**, then connected to Supabase later.

| Order | Section | Key elements |
|---|---|---|
| 1 | Navbar + Theme Toggle | Sticky, tab-active state, mobile drawer |
| 2 | Hero | Animated liquid background, name/title, CTA buttons, profile photo |
| 3 | About | Bio + quick-fact chips + animated stat counters |
| 4 | Education | Timeline with IISER Pune + Bhaskaracharya College entries |
| 5 | Skills | Categorized tabs + animated proficiency bars/rings |
| 6 | Projects | Grid + modal detail view |
| 7 | Certifications | Grid + lightbox preview (IIT JAM AIR 38 card, JGEEBILS card) |
| 8 | Achievements | Badge cards (One Health Hackathon — Regional 1st, National Finalist) |
| 9 | Gallery | Masonry grid + swipe/lightbox |
| 10 | Contact | Form + validation + social chips |
| 11 | Footer | Quick links, resume shortcut, socials |

**Sample AI prompt (repeat pattern per section):**
> "Build the Education section as a vertical timeline component. Each entry is a GlassCard containing: institution logo, degree name, institution name, date range, and a short description. Animate each card to fade+slide in from the side using Framer Motion's `whileInView`. Data should come from a typed array matching this schema: [paste EducationEntry schema]."

---

## Phase 4 — Resume Download Feature (Day 5)

1. Store resume PDF in Supabase Storage bucket (`resume/latest.pdf`).
2. Add a `resume_url` field in a `profile` table/settings row.
3. Build `DownloadResumeButton` component (used in Navbar, Hero, Footer) that links to the current `resume_url`.
4. Optional: increment a `download_count` via an API route (`/api/resume/track`) on click before redirecting.

**Sample AI prompt:**
> "Create an API route `/api/resume/track` that increments a `download_count` field in a Supabase `profile` table, then create a `DownloadResumeButton` client component that calls this route and then opens the resume URL in a new tab."

---

## Phase 5 — Database Schema & Backend (Day 6–7)

1. In Supabase, create tables per the PRD Section 8 data model: `profile`, `education`, `skill_categories`, `skills`, `projects`, `certifications`, `achievements`, `gallery_images`, `contact_submissions`, `theme_settings`.
2. Enable Row Level Security (RLS): public read access for content tables, admin-only write access, contact_submissions insert-only for public.
3. Set up Supabase Auth for a single admin user (email/password).
4. Replace mock/static data in each public section with live Supabase queries (using server components where possible for performance).

**Sample AI prompt:**
> "Generate SQL migration scripts for Supabase to create the following tables with RLS policies: [paste schema]. Public users should have SELECT access on all content tables and INSERT-only access on contact_submissions. Only authenticated admin users should have INSERT/UPDATE/DELETE access."

---

## Phase 6 — Admin CMS Dashboard (Day 8–11)

**Goal:** A protected `/admin` area where every content block is editable.

1. Build `/admin/login` page using Supabase Auth.
2. Build `/admin` layout with sidebar navigation (Dashboard, Education, Skills, Projects, Certifications, Achievements, Gallery, Messages, Resume, Theme).
3. For each content type, build a CRUD interface:
   - List view (table/cards with drag-to-reorder using `dnd-kit`)
   - Add/Edit form (with image upload widget → Supabase Storage)
   - Delete with confirmation modal
4. Build **Messages** inbox view for contact form submissions (mark as read).
5. Build **Resume** upload panel (replace current PDF, view download count).
6. Build **Theme** settings panel (default mode toggle; accent color picker — optional).

**Sample AI prompt:**
> "Build an admin CRUD interface for the 'projects' table. Include: a list view showing all projects as draggable rows (using dnd-kit) with edit/delete buttons, and a form (modal or separate page) with fields: title, description, cover image (upload to Supabase Storage), tags (multi-input), repo link, demo link, paper link. On save, update Supabase and revalidate the public projects page."

---

## Phase 7 — Animations & Polish (Day 12–13)

1. Add page-load entrance animations (staggered fade/slide per section using Framer Motion `whileInView`).
2. Add liquid-blob background animation (slow-moving gradient, GPU-accelerated, disabled under `prefers-reduced-motion`).
3. Add hover micro-interactions: icon fills, card tilts, button ripples, badge shine effects.
4. Add smooth scroll + active-tab tracking in Navbar (IntersectionObserver).
5. Polish empty states (e.g., "No projects yet" in admin/public if CMS is empty).

**Sample AI prompt:**
> "Add an IntersectionObserver-based scroll spy to the Navbar so the active tab highlights based on which section is currently in the viewport, with a smooth animated underline indicator using Framer Motion's layoutId."

---

## Phase 8 — Responsive QA (Day 14)

1. Test all breakpoints per PRD Section 6.4 (mobile 375px, tablet 768px, desktop 1280px, large desktop 1440px+).
2. Verify touch interactions replace hover-only effects on mobile (tap-to-reveal, active states).
3. Test dark/light mode on all sections for contrast issues.
4. Test gallery lightbox swipe gestures on real mobile device.
5. Fix any layout shift (CLS) issues from images/fonts.

---

## Phase 9 — Performance, SEO & Accessibility (Day 15)

1. Run Lighthouse audit; fix issues until all categories ≥ 90.
2. Add `next/image` for all images (automatic optimization, lazy loading, blur placeholder).
3. Add metadata (title, description, OG image) per PRD requirement; add JSON-LD `Person` schema with Bisman's details.
4. Keyboard navigation test (tab through entire site, modals trap focus correctly).
5. Add `alt` text for all images (admin form should require alt text on upload).

---

## Phase 10 — Deployment & Handover (Day 16)

1. Connect GitHub repo to Vercel; set environment variables (Supabase URL/keys).
2. Deploy to production; connect custom domain.
3. Final content pass: upload real bio, education dates, certificates, achievements, gallery photos, resume via Admin CMS (no code changes needed).
4. Create a short "Admin Guide" (1-page) explaining how to log in and update each section — hand this off to Bisman/friend for future self-service updates.
5. Set up basic uptime/monitoring (Vercel Analytics or similar).

---

## Suggested Timeline Summary

| Phase | Duration | Days |
|---|---|---|
| Scaffolding | 1 day | 1 |
| Design System | 1–2 days | 1–2 |
| Public Sections | 3 days | 3–5 |
| Resume Feature | 0.5 day | 5 |
| Database/Backend | 1–2 days | 6–7 |
| Admin CMS | 3–4 days | 8–11 |
| Animations/Polish | 1–2 days | 12–13 |
| Responsive QA | 1 day | 14 |
| Performance/SEO/A11y | 1 day | 15 |
| Deployment/Handover | 1 day | 16 |
| **Total** | **~16 working days** | |

*(Adjust pace freely — this assumes solo part-time development; can compress to ~7–8 days working full-time with the AI agent doing most of the scaffolding/CRUD boilerplate.)*

### Compressed Full-Time Timeline (~7 Days)

Since you're working full-time and fast, here's the same 10 phases compressed into one week. Each "day" assumes several focused hours with the AI agent doing most heavy lifting:

| Day | Phases Covered |
|---|---|
| **Day 1** | Scaffolding + full Design System (glass components, theme tokens, fonts) |
| **Day 2** | Public Sections part 1: Navbar, Hero, About, Education, Skills |
| **Day 3** | Public Sections part 2: Projects, Certifications, Achievements, Gallery, Contact + Resume download button |
| **Day 4** | Supabase schema + RLS policies + wire all public sections to live data (using `seed_content.json` as test data) |
| **Day 5** | Admin CMS: Auth + CRUD for Education, Skills, Projects, Certifications, Achievements, Gallery |
| **Day 6** | Admin CMS: Resume upload, Messages inbox, Theme settings + Animations/polish pass across whole site |
| **Day 7** | Responsive QA (mobile/tablet/desktop) + Performance/SEO/Accessibility fixes + Deploy to Vercel + real content upload via CMS |

💡 Use `seed_content.json` (placeholder data) from Day 2 onward so every section has realistic-looking content to test against, instead of building against empty/lorem-ipsum data. Swap in real content on Day 7 once the CMS is live — no code changes needed at that point.

---

## Tips for Working with Antigravity IDE's AI Agent

1. **Work section-by-section, not "build the whole site" in one prompt.** Smaller, scoped prompts (one component or one CRUD module at a time) produce more reliable, reviewable output.
2. **Paste the exact PRD schema/color tokens into prompts** rather than describing them loosely — the agent will follow structured specs more precisely.
3. **Ask the agent to explain its file changes** after each generation so you can review before accepting, especially for Supabase RLS policies (security-sensitive).
4. **Iterate visually:** after each section is generated, ask the agent to "review this against a modern liquid-glass/glassmorphism aesthetic and refine spacing, blur intensity, and animation easing" — treat the first pass as a draft.
5. **Keep a running `CONTEXT.md`** in the repo with the PRD summary, schema, and color tokens so the agent has consistent grounding across sessions.
6. **Test dark mode from the start** of each section build, not at the end — retrofitting theme support is more error-prone than building it in from Phase 1.
