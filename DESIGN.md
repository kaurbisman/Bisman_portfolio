---
name: Synthesized Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#3d4947'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#4059aa'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1d3989'
  tertiary: '#924628'
  on-tertiary: '#ffffff'
  tertiary-container: '#b05e3d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#264191'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#773215'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is engineered for the intersection of high-level biological research and professional academic positioning. The brand personality is authoritative yet accessible, reflecting the rigorous standards of an IPhD candidate. It evokes an emotional response of clarity, intellectual depth, and meticulous organization.

The design style follows a **Modern Corporate** aesthetic with a **Scientific Minimalist** edge. It prioritizes data density without sacrificing legibility. Visual interest is generated through precise alignment and subtle mathematical patterns rather than decorative flourish. The UI utilizes high whitespace ratios to mimic the clean environment of a modern laboratory, ensuring that complex research findings remain the primary focus.

## Colors
The palette is grounded in a clean white background to maximize contrast and focus. 
- **Primary (#0d9488):** A deep teal used for active states, primary actions, and highlighting key biological data points.
- **Secondary (#1e3a8a):** A navy blue utilized for structural elements, headers, and navigation to provide an anchor of institutional stability.
- **Neutral (#334155):** A slate-gray optimized for long-form reading, providing a softer alternative to pure black to reduce eye strain during deep technical review.
- **Surface Subtle (#f8fafc):** A very light cool gray used to differentiate content sections or code blocks without breaking the minimalist flow.

## Typography
This design system utilizes **Inter** for its exceptional legibility and neutral, systematic appearance. It scales effectively from large hero headlines to dense research abstracts. **JetBrains Mono** is introduced as a secondary functional font for labels, data values, and technical metadata to evoke a sense of computational precision.

Typography follows a strict hierarchical scale. Headlines use tighter letter spacing and heavier weights to command attention, while body text maintains generous line heights to facilitate the reading of complex scientific terminology. Captions are treated with uppercase styling and increased tracking for a refined, archival feel.

## Layout & Spacing
The layout philosophy is based on a **Fixed Grid** system for desktop to ensure content remains readable and structured, transitioning to a fluid model for mobile devices. 

- **Desktop:** A 12-column grid with a 1280px max-width. Sections are separated by large vertical gaps (120px) to give the research "room to breathe."
- **Tablet:** A 8-column grid with reduced margins (40px).
- **Mobile:** A 4-column grid with tight gutters (16px) and 20px side margins. 

Spacing follows a linear 8px scale. Use "Generous Whitespace" as a functional tool: larger padding around abstract summaries and publication lists helps the user scan information efficiently without cognitive overload.

## Elevation & Depth
Depth is conveyed primarily through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains the "clean room" aesthetic.

- **Level 0 (Base):** Pure white background (#ffffff).
- **Level 1 (Cards/Sections):** Subtle background shifts to Surface Subtle (#f8fafc) or a 1px border in a light slate tint (#e2e8f0).
- **Interactive States:** Use a highly diffused, low-opacity teal shadow (Primary color at 10% opacity) for hovered elements to indicate interactivity without disrupting the flat design language.
- **Overlays:** Simple 1px borders with a backdrop blur (12px) for navigation bars or modal windows, maintaining a sense of transparency and light.

## Shapes
The shape language is **Soft (0.25rem)**. This subtle rounding of corners strikes a balance between the clinical sharpness of scientific instruments and the modern approachability of a personal portfolio.

- **Primary Buttons & Inputs:** 0.25rem (4px) corner radius.
- **Cards & Image Containers:** 0.5rem (8px) corner radius for a slightly softer frame.
- **Data Tags/Chips:** Fully pill-shaped to differentiate them from interactive buttons.
- **Motifs:** Background patterns should utilize thin (0.5px - 1px) stroke lines depicting abstract cellular membranes or DNA pathways, rendered in a very faint primary color (5% opacity).

## Components
- **Buttons:** Primary buttons use a solid Teal (#0d9488) fill with white text. Secondary buttons use a Navy (#1e3a8a) outline with a transparent base. Padding should be generous (12px 24px).
- **Input Fields:** Use a 1px slate-gray border. On focus, the border shifts to Teal with a 2px outer glow of the same color at low opacity.
- **Publication Cards:** White background with a 1px #e2e8f0 border. Title in Navy blue, metadata in JetBrains Mono (Label-md).
- **Chips/Badges:** Used for research interests (e.g., "Genomics"). Pill-shaped with a light Teal background (#f0fdfa) and dark Teal text.
- **Lists:** Bullet points should be replaced with custom SVG icons of simple geometric nodes or cellular dots in the primary color.
- **Data Visualizations:** Charts should exclusively use the Primary, Secondary, and Neutral palette to ensure visual cohesion with the overall brand.