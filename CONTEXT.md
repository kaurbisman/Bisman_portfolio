# CONTEXT.md
> Keep this file in the root of the repo. Paste relevant sections into Antigravity prompts, or point the agent to this file, so every generation session stays grounded in the same facts, schema, and design tokens.

---

## 1. Real Facts (confirmed — do not alter)

- **Name:** Bisman Kaur
- **Current Program:** IPhD (Integrated PhD), Biological Sciences — IISER Pune
- **Bachelor's:** B.Sc. (Hons.) Biomedical Science — Bhaskaracharya College of Applied Sciences, University of Delhi
- **Exam Result:** IIT JAM — All India Rank (AIR) 38
- **Qualification:** JGEEBILS Qualified
- **Achievement 1:** National One Health Hackathon — 1st Rank, Regional Level
- **Achievement 2:** National One Health Hackathon — Grand Finalist, National Level

⚠️ **Everything below this line marked [PLACEHOLDER] is drafted content — replace via the Admin CMS once real material is provided by Bisman. Do not treat placeholder text as fact when generating copy elsewhere.**

---

## 2. Placeholder Content (draft — replace later)

**Tagline [PLACEHOLDER]:**
> "Exploring the frontiers of biological sciences, one experiment at a time."

**Short Bio [PLACEHOLDER]:**
> "Bisman Kaur is an IPhD scholar in Biological Sciences at IISER Pune, with a foundation in Biomedical Science from the University of Delhi. Her academic path — marked by an All India Rank of 38 in IIT JAM and JGEEBILS qualification — reflects a strong commitment to research excellence. Beyond academics, she has represented her interdisciplinary interests at the National One Health Hackathon, securing 1st place at the regional level and advancing as a Grand Finalist nationally. She is driven by curiosity at the intersection of biology, health systems, and interdisciplinary research."

**Contact Links [PLACEHOLDER — update in Admin CMS]:**
- Email: `bismankaur.placeholder@email.com`
- LinkedIn: `https://linkedin.com/in/bisman-kaur-placeholder`
- GitHub: *(add if relevant — may not apply for a biology researcher; omit if unused)*
- Google Scholar / ORCID: *(add once available — common for IPhD scholars)*

**Location [PLACEHOLDER]:** Pune, India *(confirm)*

---

## 3. Design Tokens (source of truth — do not redefine differently elsewhere)

### Light Mode
```css
--bg-base: #F5F7FA;
--bg-glass: rgba(255,255,255,0.55);
--border-glass: rgba(255,255,255,0.8);
--text-primary: #111827;
--text-secondary: #4B5563;
--accent-primary: #4F7CFF;
--accent-secondary: #8B5CF6;
--accent-tertiary: #22C1A6;
--shadow-glass: 0 8px 32px rgba(31,38,135,0.12);
```

### Dark Mode
```css
--bg-base: #0B0F19;
--bg-glass: rgba(255,255,255,0.06);
--border-glass: rgba(255,255,255,0.12);
--text-primary: #F3F4F6;
--text-secondary: #9CA3AF;
--accent-primary: #7C9CFF;
--accent-secondary: #A78BFA;
--accent-tertiary: #34D8BC;
--shadow-glass: 0 8px 32px rgba(0,0,0,0.45);
```

### Typography
- Headings: Space Grotesk (or Clash Display / General Sans)
- Body: Inter (or Satoshi)
- Stats/mono accents: JetBrains Mono

### Breakpoints
- Mobile: `< 640px`
- Tablet: `640px – 1024px`
- Desktop: `> 1024px`
- Large Desktop: `> 1440px`

---

## 4. Data Schema (source of truth)

```
Profile { name, title, tagline, bio, profilePhoto, resumeFileUrl, socialLinks[] }
EducationEntry { id, degree, institution, logo, startDate, endDate, description, order }
SkillCategory { id, name, order }
Skill { id, categoryId, name, icon, proficiency (0-100), order }
Project { id, title, description, coverImage, tags[], links{repo, demo, paper}, order }
Certification { id, title, issuer, date, fileUrl/image, verifyLink, order }
Achievement { id, title, level, result, description, date, image, order }
GalleryImage { id, url, caption, order }
ContactSubmission { id, name, email, subject, message, submittedAt, read }
ThemeSettings { defaultMode, accentColorOverride }
```

---

## 5. Stack

Next.js (App Router, TypeScript) + Tailwind CSS + Framer Motion + Supabase (DB, Auth, Storage) + Vercel (hosting).

---

## 6. Build Priority Order

1. Design system / theme tokens
2. Reusable Glass components
3. Public sections (static data first)
4. Resume download
5. Supabase schema + RLS
6. Admin CMS CRUD
7. Animations/polish
8. Responsive QA
9. Performance/SEO/A11y
10. Deploy

---

## 7. Non-negotiable Constraints

- Every visible content block must be CMS-editable — no hardcoded copy in components once Phase 5+ is reached.
- Dark and light mode must both be fully styled from the start — do not retrofit.
- All animations must respect `prefers-reduced-motion`.
- Mobile-first: build and test mobile layout before desktop for each section.
