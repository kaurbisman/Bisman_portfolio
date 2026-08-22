# Product Requirements Document (PRD)
## Bisman Kaur — Professional Portfolio Website

| | |
|---|---|
| **Document Version** | 1.0 |
| **Date** | August 2026 |
| **Owner** | Developer (built via Antigravity IDE + AI agent) |
| **Subject** | Bisman Kaur — Researcher / IPhD Scholar, IISER Pune |

---

## 1. Overview

### 1.1 Purpose
A modern, single-page-feel (multi-tab/section) professional portfolio website for **Bisman Kaur**, showcasing her academic profile, research trajectory, achievements, and contact information. The site should feel premium, scientific, and credible — appropriate for an academic/research audience (professors, PI's, admission committees, collaborators, recruiters for research internships) while remaining visually striking with a **Liquid Glass** design language.

### 1.2 Subject Profile (Content Basis)
- **Name:** Bisman Kaur
- **Current Status:** IPhD Scholar, Biological Sciences, IISER Pune
- **Education:** B.Sc. (Hons.) Biomedical Science, Bhaskaracharya College of Applied Sciences, University of Delhi
- **Exams/Qualifications:** IIT JAM — All India Rank 38; JGEEBILS Qualified
- **Achievements:** National One Health Hackathon — 1st Rank (Regional Level), Grand Finalist (National Level)

### 1.3 Vision
The site should read like a "living CV meets research lab website" — trustworthy, clean, data-forward, but with tasteful glassmorphism/liquid-glass motion design that feels current (2026-grade UI), not templated.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|---|---|
| Establish professional/academic credibility | Resume downloads, contact form submissions |
| Fast, accessible, cross-device experience | Lighthouse score ≥ 90 (Performance, Accessibility, SEO) |
| Easy content upkeep without touching code | 100% of visible content editable via Admin CMS |
| Modern visual differentiation | Positive qualitative feedback; low bounce rate |
| Mobile-first usability | Fully functional on mobile/tablet/desktop breakpoints |

---

## 3. Target Audience
1. Academic admission committees / PhD program reviewers
2. Professors / potential research collaborators & PI's
3. Hackathon / competition organizers, peer researchers
4. Recruiters for research assistantships, internships, fellowships
5. General visitors (friends, LinkedIn network) verifying credentials

---

## 4. Information Architecture / Sitemap

Single-page app with a **sticky tab-style navigation** (not traditional multi-page routing, though each section can also have a deep-linkable route/hash for SEO):

```
Home (Hero)
 ├── About
 ├── Education
 ├── Skills
 ├── Projects / Research
 ├── Certifications
 ├── Achievements
 ├── Gallery
 └── Contact
```

Footer present on all views with quick links + social icons + resume download shortcut.

---

## 5. Feature Requirements

### 5.1 Hero / Home Section
- Full-viewport intro with name, current title ("IPhD Scholar, Biological Sciences — IISER Pune"), short tagline.
- Animated liquid-glass background (soft blurred moving gradient blobs behind frosted-glass panels).
- Primary CTAs: **Download Resume**, **Contact Me**.
- Scroll-cue animation (subtle bounce arrow / SVG).
- Profile photo in a glass-framed circular/blob-mask container with hover parallax tilt.

### 5.2 About Section
- Short bio paragraph (CMS-editable rich text).
- Quick-fact chips: Current Program, University, Bachelor's Degree, Location.
- Optional embedded highlight stat row (e.g., "AIR 38", "1st Rank Regional Hackathon") as animated counters.

### 5.3 Education (Tab/Timeline)
Vertical/horizontal **timeline component** with glass cards per entry:
- IPhD, Biological Sciences — IISER Pune (Current)
- B.Sc. (Hons.) Biomedical Science — Bhaskaracharya College of Applied Sciences, University of Delhi
- Each card: Degree, Institution, Duration (CMS field), Description/Highlights, Institution logo (SVG upload).
- Hover: card lifts with soft glass glow + shadow expansion.

### 5.4 Skills
- Categorized skill groups (e.g., Lab/Technical Skills, Computational/Bioinformatics Skills, Soft Skills) — admin-defined categories.
- Each skill: name + icon (SVG) + proficiency indicator (progress bar / radial ring with liquid-fill animation).
- Filter/tab switch between categories with smooth transition.

### 5.5 Projects / Research
- Grid of glass cards; each project has: title, short description, tags/tech, cover image, external link (paper/repo/demo), and a "View Details" modal/expand.
- Modal opens with liquid-glass blur-backdrop transition.
- Admin can add/edit/delete/reorder projects.

### 5.6 Certifications
- Card/grid layout: Certificate title, issuing body, date, certificate image/PDF preview, verification link.
- Includes: JGEEBILS Qualification, IIT JAM AIR 38 (as a credential card), and any future certifications added via CMS.
- Lightbox preview on click.

### 5.7 Achievements
- Highlight cards/timeline for:
  - National One Health Hackathon — 1st Rank, Regional Level
  - National One Health Hackathon — Grand Finalist, National Level
- Badge/medal-style SVG icons with hover shine animation.
- Each achievement: Title, Level (Regional/National), Rank/Result, Description, Date, optional image proof.

### 5.8 Gallery
- Masonry / responsive grid image gallery (event photos, hackathon photos, lab/campus photos).
- Admin can upload/delete/reorder images, add captions.
- Lightbox with swipe (mobile) / arrow navigation (desktop), pinch-zoom on mobile.
- Lazy-loading + blurred placeholder (LQIP) for performance.

### 5.9 Contact
- Contact form: Name, Email, Subject, Message → stored in CMS + optional email notification (via connector, e.g., email service webhook).
- Direct contact chips: Email, LinkedIn, GitHub (if any), ORCID/Google Scholar (if applicable) — all admin-editable links with SVG icons, hover color-fill animation.
- Optional embedded map/location chip (city-level only, no exact address).

### 5.10 Resume
- **Download Resume** button in Navbar (sticky) + Hero + Footer.
- File managed via Admin CMS (upload new PDF anytime; button always points to latest).
- Optionally track download count as a CMS-visible metric.

### 5.11 Admin CMS Dashboard
A protected `/admin` route (auth-gated: email+password or magic link) where every content block above is editable:

| Module | Admin Capabilities |
|---|---|
| Hero | Edit name, title, tagline, profile photo, background style |
| About | Edit bio text, quick facts, stat counters |
| Education | Add/edit/delete/reorder timeline entries + logos |
| Skills | Add/edit/delete categories & individual skills + proficiency + icons |
| Projects | Full CRUD, image upload, tags, links, reorder (drag-drop) |
| Certifications | Full CRUD, file/image upload, verification links |
| Achievements | Full CRUD, badge icon selection, description |
| Gallery | Bulk image upload, captions, delete, reorder |
| Contact | Edit contact links/icons; view submitted messages inbox |
| Resume | Upload/replace PDF; view download count |
| Theme | Toggle default theme (light/dark), accent color picker (optional stretch) |
| SEO | Edit meta title/description/OG image per section (stretch goal) |

- CMS should have a clean, minimal dashboard UI (sidebar nav + content editor panels), separate visual style from the public site (can also use glass theme for consistency, lighter accent).
- Auto-save / explicit "Save & Publish" pattern with draft vs. live state (stretch goal; MVP can be direct-publish).

---

## 6. Design System — "Liquid Glass" Theme

### 6.1 Visual Language
- **Glassmorphism 2.0 ("Liquid Glass")**: frosted translucent panels (`backdrop-filter: blur()`), soft multi-layer drop shadows, subtle animated gradient "liquid" blobs drifting behind glass layers, thin 1px light-reflective borders (gradient border), rounded-large corners (20–32px radius).
- Micro-interactions: buttons/cards have a liquid ripple or gentle morph on hover; icons fill/glow on hover; page section transitions use fade+slide with easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), not linear.
- SVGs used for: icons, badges, section dividers/blobs, logos, decorative shapes — crisp at all resolutions, theming-aware (currentColor / CSS variables for stroke & fill).

### 6.2 Color System

**Light Mode**
| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#F5F7FA` | Page background |
| `--bg-glass` | `rgba(255,255,255,0.55)` | Glass panel fill |
| `--border-glass` | `rgba(255,255,255,0.8)` | Glass panel border |
| `--text-primary` | `#111827` | Headings/body |
| `--text-secondary` | `#4B5563` | Sub-text |
| `--accent-primary` | `#4F7CFF` (research blue) | CTAs, links, highlights |
| `--accent-secondary` | `#8B5CF6` (violet) | Gradient pairing, badges |
| `--accent-tertiary` | `#22C1A6` (teal, bio/science feel) | Skill bars, success states |
| `--shadow-glass` | `0 8px 32px rgba(31,38,135,0.12)` | Card elevation |

**Dark Mode**
| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#0B0F19` | Page background |
| `--bg-glass` | `rgba(255,255,255,0.06)` | Glass panel fill |
| `--border-glass` | `rgba(255,255,255,0.12)` | Glass panel border |
| `--text-primary` | `#F3F4F6` | Headings/body |
| `--text-secondary` | `#9CA3AF` | Sub-text |
| `--accent-primary` | `#7C9CFF` | CTAs, links, highlights |
| `--accent-secondary` | `#A78BFA` | Gradient pairing, badges |
| `--accent-tertiary` | `#34D8BC` | Skill bars, success states |
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.45)` | Card elevation |

- Theme toggle: sun/moon animated SVG icon switch in navbar; respects `prefers-color-scheme` on first load, persists user choice (localStorage-equivalent server-safe cookie or CMS-driven default).
- Gradient backgrounds: animated conic/radial gradients (accent-primary → accent-secondary → accent-tertiary) behind glass blobs, slow-moving (~20–30s loop), `will-change: transform` for GPU performance, reduced/disabled under `prefers-reduced-motion`.

### 6.3 Typography
- **Headings:** A modern geometric/humanist sans-serif with a slight editorial feel — e.g., **"Clash Display"**, **"General Sans"**, or **"Space Grotesk"** (any one, self-hosted or via variable font for performance).
- **Body:** **"Inter"** or **"Satoshi"** — highly legible, professional, great at small sizes for data-dense sections (skills, timeline).
- **Mono (for stats/ranks, e.g., "AIR 38"):** **"JetBrains Mono"** or **"Space Mono"** for a nice scientific/data contrast.
- Type scale: fluid/responsive using `clamp()` (e.g., H1: `clamp(2.25rem, 5vw, 4rem)`).
- Consistent vertical rhythm (8px baseline grid).

### 6.4 Responsive Breakpoints
| Breakpoint | Width | Layout Behavior |
|---|---|---|
| Mobile | < 640px | Single column, bottom/hamburger nav, stacked cards |
| Tablet | 640px – 1024px | 2-column grids, condensed nav tabs |
| Desktop | > 1024px | Full multi-column grids, sticky top tab nav, wide hero |
| Large Desktop | > 1440px | Max-width container (e.g., 1280–1440px), extra whitespace |

- Touch-friendly tap targets (min 44px) on mobile; hover-only effects gracefully degrade to tap/active states on touch devices.

---

## 7. Technical Requirements

### 7.1 Suggested Stack (Antigravity IDE + AI-assisted build)
- **Frontend:** Next.js (React, App Router) + TypeScript + Tailwind CSS (for utility-first styling paired with custom CSS variables for the glass theme) + Framer Motion (animations/transitions).
- **SVG/Icons:** Custom SVG set + `lucide-react` or hand-crafted SVGs for uniqueness.
- **Backend/CMS:** Headless approach — options ranked by ease of AI-assisted setup:
  1. **Next.js API routes + a hosted database** (e.g., Supabase/Postgres) with a custom lightweight admin dashboard (recommended — full control, matches "Admin CMS dash" requirement precisely).
  2. Alternative: Sanity.io / Payload CMS as headless CMS if faster setup is preferred over fully custom admin.
- **Auth (Admin):** Simple email/password or magic-link auth (e.g., Supabase Auth / NextAuth.js) — single admin user is sufficient.
- **File/Image Storage:** Supabase Storage / Cloudinary for gallery, resume PDF, certificate images (with automatic image optimization).
- **Hosting:** Vercel (ideal for Next.js, free tier sufficient for portfolio scale).
- **Forms:** Contact form → stored in DB + optional email relay (Resend/SendGrid webhook).

### 7.2 Non-Functional Requirements
- **Performance:** Lighthouse ≥ 90 across the board; images lazy-loaded and served in modern formats (WebP/AVIF); animations GPU-accelerated.
- **Accessibility:** WCAG 2.1 AA — proper contrast in both themes, keyboard navigation, `aria-labels`, `prefers-reduced-motion` respected.
- **SEO:** Semantic HTML, meta tags, Open Graph image, sitemap.xml, structured data (Person schema via JSON-LD).
- **Security:** Admin routes protected; file upload validation (type/size limits); rate-limiting on contact form.
- **Browser Support:** Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari & Android Chrome for mobile.

---

## 8. Content Data Model (Simplified Schema)

```
Profile { name, title, tagline, bio, profilePhoto, resumeFileUrl, socialLinks[] }

EducationEntry { id, degree, institution, logo, startDate, endDate, description, order }

SkillCategory { id, name, order }
Skill { id, categoryId, name, icon, proficiency (0-100), order }

Project { id, title, description, coverImage, tags[], links{repo, demo, paper}, order }

Certification { id, title, issuer, date, fileUrl/image, verifyLink, order }

Achievement { id, title, level (Regional/National/etc), result, description, date, image, order }

GalleryImage { id, url, caption, order }

ContactSubmission { id, name, email, subject, message, submittedAt, read }

ThemeSettings { defaultMode (light/dark/system), accentColorOverride (optional) }
```

---

## 9. Out of Scope (v1)
- Blog/publications module (can be Phase 2)
- Multi-admin roles/permissions
- Multi-language support
- Analytics dashboard beyond basic download/submission counts

---

## 10. Open Assumptions
- Content (bio text, exact institution logos, profile photo, certificate files) will be supplied by Bisman/friend after structural build.
- Single admin user is sufficient (no role-based access needed).
- Domain/hosting account will be provided separately.

---

## 11. Acceptance Criteria (MVP Definition of Done)
- [ ] All 8 sections (Home, About, Education, Skills, Projects, Certifications, Achievements, Gallery) + Contact live and navigable via tabs
- [ ] Light/Dark mode toggle fully themed per Section 6.2
- [ ] Fully responsive on mobile/tablet/desktop (manually tested on 3 breakpoints minimum)
- [ ] Resume download works and reflects latest admin-uploaded file
- [ ] Admin CMS can CRUD every content section without code changes
- [ ] Contact form submissions land in CMS inbox
- [ ] Lighthouse scores ≥ 90 on Performance/Accessibility/SEO/Best Practices
- [ ] All hover/animation interactions work on desktop; touch-equivalents work on mobile
