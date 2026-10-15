# Aleef Veterinary Clinic — Developer Documentation (A to Z)

Comprehensive architectural, design system, CSS, motion physics, and component documentation for the **Aleef Veterinary Clinic** web application.

---

## Table of Contents
1. [Architecture & Technology Stack](#1-architecture--technology-stack)
2. [Design System & Visual Language](#2-design-system--visual-language)
   - [Design Theme & Philosophy](#design-theme--philosophy)
   - [Typography System](#typography-system)
   - [Color Palette & Semantic Tokens](#color-palette--semantic-tokens)
   - [Elevation, Shadows & Radii](#elevation-shadows--radii)
3. [CSS Classes, Animations & Properties (`globals.css`)](#3-css-classes-animations--properties-globalscss)
   - [Base Styles & HTML Scroll Padding](#base-styles--html-scroll-padding)
   - [Continuous Review Marquee](#continuous-review-marquee)
   - [Card Hover & Micro-Elevations](#card-hover--micro-elevations)
   - [CTA Button Pulse Ring](#cta-button-pulse-ring)
   - [Map Circular Reveal Effect](#map-circular-reveal-effect)
   - [Contact Form Floating Focus & Shine](#contact-form-floating-focus--shine)
   - [Footer Animated Sliding Underline](#footer-animated-sliding-underline)
   - [Accessibility & Reduced Motion Overrides](#accessibility--reduced-motion-overrides)
4. [Centralized Motion System (`lib/motion.ts`)](#4-centralized-motion-system-libmotionts)
   - [Motion Tokens](#motion-tokens)
   - [Reusable Animation Variants](#reusable-animation-variants)
   - [Unified `<Reveal />` Component](#unified-reveal--component)
5. [Navigation & Header Motion Architecture](#5-navigation--header-motion-architecture)
   - [Active Section Tracking with `IntersectionObserver`](#active-section-tracking-with-intersectionobserver)
   - [Section ID Mapping Logic](#section-id-mapping-logic)
   - [Moving Underline via Framer Motion `layoutId`](#moving-underline-via-framer-motion-layoutid)
   - [Header Scroll Behavior & Backdrop Blur](#header-scroll-behavior--backdrop-blur)
   - [Mobile Menu Animated Drawer](#mobile-menu-animated-drawer)
6. [Component Guide: Section by Section (A to Z)](#6-component-guide-section-by-section-a-to-z)
   - [Scroll Progress Bar](#scroll-progress-bar)
   - [Header](#header)
   - [Hero Section](#hero-section)
   - [Services Section](#services-section)
   - [About Us Section](#about-us-section)
   - [Why Choose Us Section](#why-choose-us-section)
   - [Our Team Section](#our-team-section)
   - [Testimonials Marquee Section](#testimonials-marquee-section)
   - [CTA Banner](#cta-banner)
   - [Clinic Info ("Find Us")](#clinic-info-find-us)
   - [Contact Section & Form](#contact-section--form)
   - [Footer](#footer)
7. [Accessibility & SEO Standards](#7-accessibility--seo-standards)
8. [File Structure & Directory Map](#8-file-structure--directory-map)
9. [Developer Commands & Maintenance](#9-developer-commands--maintenance)

---

## 1. Architecture & Technology Stack

| Layer | Tool / Library | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.x | Production server, Turbopack, SSR, API routes |
| **UI Runtime** | React | 19.x | Component lifecycle & rendering engine |
| **Language** | TypeScript | 5.x | Strict end-to-end type safety |
| **Styling** | Tailwind CSS v4 & Plain CSS | 4.x | Utility classes & custom CSS animations |
| **Motion & Animation** | Framer Motion | 12.x | Physics springs, layoutId animations, scroll hooks |
| **Forms & Validation** | React Hook Form + Zod | latest | Client & server-side contact form validation |
| **Iconography** | Lucide React | latest | Lightweight, accessible SVG icons |

---

## 2. Design System & Visual Language

### Design Theme & Philosophy
- **Name**: *Modern Compassionate Clinical*
- **Tone**: Warm, authoritative, trustworthy, premium, and gentle.
- **Intent**: Eliminates the cold, sterile impression of traditional clinics while maintaining medical authority through deep oceanic navies, vibrant sky accents, and warm sun-golden ambers.

### Typography System

Two Google Web Fonts are integrated via `next/font/google` in `app/layout.tsx`:

```ts
// app/layout.tsx
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});
```

| Font Name | CSS Variable | Primary Applications |
|---|---|---|
| **Poppins** | `var(--font-poppins)` | Body paragraphs, section headings, card descriptions, form inputs, metadata. |
| **Quicksand** | `var(--font-quicksand)` | Brand logos, navigation links, primary CTA buttons, badges, key accents. |

### Color Palette & Semantic Tokens

Defined in `app/globals.css` under `:root`:

```css
:root {
  --color-primary: #234582;          /* Classic clinical blue */
  --color-primary-dark: #1b3668;     /* Deep navy shade for dark buttons / hover states */
  --color-primary-light: #2B4F91;    /* Lighter ocean blue for icons / secondary elements */
  --color-accent: #F7C83F;           /* Warm sunlight yellow / primary appointment accent */
  --color-accent-dark: #e5b328;      /* Amber hover for buttons */
  --color-accent-light: #fdedad;     /* Soft pastel gold for badges and highlight rings */
  --color-blue-accent: #2B4F91;
  --color-text-dark: #1E293B;        /* High-contrast charcoal text for headings */
  --color-text-medium: #4C5566;      /* Slate gray for body paragraphs */
  --color-text-light: #6B7280;       /* Muted neutral for captions and timestamps */
  --color-bg-light: #EDF4FF;         /* Ultra-light ice-blue tint for card backgrounds */
  --color-bg-section: #E5ECF8;       /* Subtle section division background */
  --color-bg-panel: #D2D9E7;         /* Enclosed panel fills (e.g. Why Choose Us) */
  --color-bg-testimonial: #E5ECF8;   /* Soft backdrop for testimonial cards */
  --color-white: #ffffff;            /* Pure card & container surface */
  --color-border: #D8E0EC;           /* Soft divider border */
}
```

#### Specific Component Color Mapping:
- **Brand Navy (`#012679` / `#01277A`)**: Logo paw icon, active navigation link, main titles.
- **Vibrant Blue (`#009AE8` / `#019AE7`)**: Inactive navigation links, sliding underline, focus rings.
- **Dark Indigo Navy (`#203E7D`)**: Primary CTA button background ("Book an Appointment").
- **Warm Gold (`#F7C83F`)**: Scroll progress bar, "Aleef Veterinary?" curved underline, CTA action buttons.
- **Navbar Background (`#F8FAF5`)**: Warm organic cream/off-white (80-95% opacity when scrolled).

### Elevation, Shadows & Radii
- **Base Card Shadow**: `0 4px 20px rgba(32, 62, 125, 0.04)`
- **Interactive Card Lift Shadow**: `0 20px 32px -8px rgba(32, 62, 125, 0.16), 0 8px 16px -4px rgba(32, 62, 125, 0.08)`
- **Floating Header Shadow**: `0 4px 20px -2px rgba(0, 38, 121, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)`
- **Border Radii**:
  - Cards & Panels: `rounded-2xl` (`16px`) and `rounded-3xl` (`24px`)
  - Buttons & Pills: `rounded-full` (`9999px`)
  - Inputs & Small Containers: `rounded-lg` (`8px`) or `rounded-xl` (`12px`)

---

## 3. CSS Classes, Animations & Properties (`globals.css`)

### Base Styles & HTML Scroll Padding
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 72px; /* Offsets anchor jump by sticky header height */
  font-family: var(--font-poppins), 'Poppins', system-ui, -apple-system, sans-serif;
}
```
*Why `scroll-padding-top: 72px`?*
When a user clicks any anchor link (`#services`, `#about`, `#team`, `#contact`), native browser scrolling automatically offsets by 72px, preventing headers from overlapping section titles.

---

### Continuous Review Marquee

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

.marquee-track {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  width: max-content !important;
  max-width: none !important;
  animation: marquee 40s linear infinite;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}
```
- **Structure**: Single horizontal flex container containing the review list rendered twice back-to-back.
- **Hardware Acceleration**: Uses `will-change: transform` and translates only along the X axis.
- **Interaction**: Smoothly pauses on mouse hover without resetting position.

---

### Card Hover & Micro-Elevations

```css
.card-interactive-hover {
  transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1), 
              box-shadow 250ms cubic-bezier(0.22, 1, 0.36, 1) !important;
}

.card-interactive-hover:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 20px 32px -8px rgba(32, 62, 125, 0.16), 
              0 8px 16px -4px rgba(32, 62, 125, 0.08) !important;
}
```
- Applied to service cards, team member cards, and review cards.
- Provides a responsive 6px physical lift with warm drop shadows.

---

### CTA Button Pulse Ring

```css
@keyframes ctaPulseRing {
  0% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0.45); }
  70% { box-shadow: 0 0 0 14px rgba(245, 200, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0); }
}

.cta-pulse-ring {
  animation: ctaPulseRing 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
}
```
- Creates an ambient expanding aura around primary appointment buttons to guide conversions without being intrusive.

---

### Map Circular Reveal Effect

```css
@keyframes mapReveal {
  from {
    clip-path: circle(0% at 40% 35%);
    -webkit-clip-path: circle(0% at 40% 35%);
    transform: scale(1.06);
  }
  to {
    clip-path: circle(150% at 40% 35%);
    -webkit-clip-path: circle(150% at 40% 35%);
    transform: scale(1);
  }
}

.map-clip-reveal {
  animation: mapReveal 1.2s ease-in-out forwards;
  will-change: clip-path, transform;
}
```
- Used in the **Find Us** map section. Unfolds outward from the clinic's geographical pin position (`40% 35%`) when scrolled into view.

---

### Contact Form Floating Focus & Shine

```css
.contact-field-group label {
  display: inline-block;
  transition: color 200ms ease, transform 200ms ease;
  will-change: transform, color;
}

.contact-field-group:focus-within label {
  color: #203E7D !important;
  transform: translateY(-2px);
}

.contact-field-group input:focus,
.contact-field-group select:focus,
.contact-field-group textarea:focus {
  border-color: #203E7D !important;
  box-shadow: 0 0 0 4px rgba(32, 62, 125, 0.12) !important;
  outline: none;
}

@keyframes contactBtnShine {
  0%, 65% { transform: translateX(-160%) skewX(-20deg); }
  85%, 100% { transform: translateX(260%) skewX(-20deg); }
}

.contact-btn-shine {
  animation: contactBtnShine 4s ease-in-out infinite;
}
```
- Floating micro-interaction: Labels lift and tint navy when the associated input gains focus.
- Diagonal light sweep across the "Send Message" button every 4 seconds.

---

### Footer Animated Sliding Underline

```css
.footer-hover-link {
  position: relative;
  display: inline-block;
  transition: color 200ms ease;
}

.footer-hover-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms ease-out;
}

.footer-hover-link:hover::after {
  transform: scaleX(1);
}
```

---

### Accessibility & Reduced Motion Overrides

Every animation is protected with `@media (prefers-reduced-motion: reduce)`:
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .marquee-track, .marquee-track-reverse {
    animation: none !important;
    transform: none !important;
  }
  .marquee-container {
    overflow-x: auto !important;
    scroll-snap-type: x mandatory;
  }
  .cta-pulse-ring, .map-clip-reveal, .contact-btn-shine {
    animation: none !important;
  }
}
```

---

## 4. Centralized Motion System (`lib/motion.ts`)

Located in [`lib/motion.ts`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/lib/motion.ts).

### Motion Tokens
```ts
export const motionDurations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

export const motionEasing = {
  entrance: [0.22, 1, 0.36, 1] as const, // Custom cubic-bezier curve
  smooth: [0.25, 0.1, 0.25, 1] as const,
  easeOut: "easeOut" as const,
  easeInOut: "easeInOut" as const,
} as const;

export const motionStagger = {
  cards: 0.12,
  items: 0.08,
  list: 0.12,
  words: 0.08,
  small: 0.08,
} as const;

export const motionOffsets = {
  y: 30,
  yMobile: 20,
  x: 60,
  xMobile: 30,
} as const;

export const defaultViewport = {
  once: true,
  amount: 0.25,
} as const;
```

### Reusable Animation Variants
1. **`fadeUpVariants`**: Elements rise 30px with opacity 0 $\rightarrow$ 1 over 0.6s.
2. **`slideLeftVariants`** & **`slideRightVariants`**: Horizontal slide-in from $\pm 60$px.
3. **`staggerContainerVariants`**: Staggers children by `0.12s` (cards) or `0.08s` (words).
4. **`blurInVariants`**: Large feature images fade in while transitioning from `filter: blur(14px)` to `blur(0px)`.
5. **`cardHoverVariants`** & **`buttonHoverVariants`**: Unified spring physics for interactive states.

### Unified `<Reveal />` Component
Exported from [`components/ui/Reveal.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/ui/Reveal.tsx):
```tsx
<Reveal delay={0.2} duration={0.6} y={30} as="div">
  <h2>Your Title</h2>
</Reveal>
```
Supports polymorphic tags (`div`, `section`, `article`, `span`) and respects `useReducedMotion()`.

---

## 5. Navigation & Header Motion Architecture

Located in [`components/layout/Header.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/layout/Header.tsx).

```
   ┌─────────────────────────────────────────────────────────────┐
   │ [Paw Logo]       Home  About Us  Services  Our Team Contact │ [Book Now]
   │                    ─── (Framer Motion layoutId underline)    │
   └─────────────────────────────────────────────────────────────┘
```

### Active Section Tracking with `IntersectionObserver`
- Uses exact viewport margin: `rootMargin: "-40% 0px -50% 0px"`.
- This creates a narrow 10% detection band positioned 40% from the top of the viewport.
- An internal map tracks which section is closest to the 45% screen center line.

### Section ID Mapping Logic
Eliminates intermediate mismatches where non-nav sections are on screen:

```ts
const sectionToNavMap: Record<string, string> = {
  home: "#home",
  services: "#services",
  about: "#about",
  "why-choose-us": "#about",     // Maps to nearest nav: About Us
  team: "#team",
  testimonials: "#contact",       // Leads into booking/contact conversion flow
  cta: "#contact",
  "clinic-info": "#contact",
  contact: "#contact",
};
```

### Moving Underline via Framer Motion `layoutId`
- Rather than individual static underlines jumping abruptly, a single `<motion.div layoutId="activeNavUnderline" />` is shared between links.
- **Spring Physics**: `stiffness: 380, damping: 30`.
- The underline smoothly slides under whichever link is currently active.

### Header Scroll Behavior & Backdrop Blur
- Header height is fixed at `72px`.
- Listens to scroll via `useSyncExternalStore` (`scrollY > 20px`).
- When scrolled:
  - Background transitions from `#F8FAF5` to `rgba(248, 250, 245, 0.95)`
  - Applies `backdropFilter: blur(10px)`
  - Adds a subtle multi-stop elevation shadow
  - Smooth transition: `250ms ease`

### Mobile Menu Animated Drawer
- Uses `<AnimatePresence>` from Framer Motion.
- Smoothly slides down and unfolds (`height: 0 -> auto`, `opacity: 0 -> 1`, `y: -8 -> 0`) over `0.3s`.
- Clicking any link closes the drawer immediately before initiating smooth scroll.

---

## 6. Component Guide: Section by Section (A to Z)

### Scroll Progress Bar
- **File**: [`components/ui/ScrollProgress.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/ui/ScrollProgress.tsx)
- **Position**: `fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 60`.
- **Height**: `3px`
- **Color**: `#F7C83F` (Accent Gold)
- **Physics**: Follows `scrollYProgress` with `useSpring({ stiffness: 120, damping: 24 })`.
- **Top Fade**: Opacity remains 0 until scrolled 40px down.

---

### Header
- **File**: [`components/layout/Header.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/layout/Header.tsx)
- **Elements**: Brand logo with PawPrint icon, 5 navigation links, right-hand "Book an Appointment" pill button, and mobile hamburger button.

---

### Hero Section
- **File**: [`components/sections/Hero.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/Hero.tsx)
- **ID**: `id="home"`
- **Motion**:
  - Trust badge entrance with soft scale.
  - Headline fade-up (`0.6s`).
  - Staggered buttons (Yellow primary + outline secondary).
  - Ambient floating decorative background circles.

---

### Services Section
- **File**: [`components/sections/Services.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/Services.tsx)
- **ID**: `id="services"`
- **Cards**: Grooming, Check-up, Surgery, Ultrasound.
- **Motion**:
  - Horizontal side-to-side entrance (`slideLeft` / `slideRight`).
  - `.card-interactive-hover` 6px lift and shadow expansion.

---

### About Us Section
- **File**: [`components/sections/About.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/About.tsx)
- **ID**: `id="about"`
- **Motion**:
  - Clinic image uses `blurInVariants` (14px blur clearing to 0px).
  - "10+ Years Experience" badge scales in with spring physics.
  - Staggered checkmark features rise into view.

---

### Why Choose Us Section
- **File**: [`components/sections/WhyChooseUs.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/WhyChooseUs.tsx)
- **ID**: `id="why-choose-us"`
- **Motion**:
  - Panel zoom-in (`opacity: 0 -> 1, scale: 0.96 -> 1`).
  - Self-drawing curved underline under "Aleef Veterinary?" using an inline SVG `<motion.path pathLength="0 -> 1" />` in `#F7C83F`.
  - **Corner Converge 2x2 Grid**:
    - Top-Left card enters from `x: -30, y: -20`
    - Top-Right card enters from `x: 30, y: -20`
    - Bottom-Left card enters from `x: -30, y: 20`
    - Bottom-Right card enters from `x: 30, y: 20`

---

### Our Team Section
- **File**: [`components/sections/Team.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/Team.tsx)
- **ID**: `id="team"`
- **Cards**: Dr. Sarah Jenkins, Dr. Michael Chen, Dr. Emily Roberts.
- **Motion**: Staggered card rise (`stagger: 0.12s`), credential pill highlights, and image zoom on hover.

---

### Testimonials Marquee Section
- **Files**: 
  - [`components/sections/Testimonials.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/Testimonials.tsx)
  - [`components/ui/ReviewMarquee.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/ui/ReviewMarquee.tsx)
- **ID**: `id="testimonials"`
- **Motion**: Single horizontal flex track executing continuous 40s linear loop. Pauses smoothly on hover. Quote icon pulses gently (`animate-quote-pulse`).

---

### CTA Banner
- **File**: [`components/sections/CTA.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/CTA.tsx)
- **ID**: `id="cta"`
- **Motion**:
  - Word-by-word staggered headline reveal (`0.08s` stagger).
  - Drifting ambient radial light behind text (`x: -15% to 15%`, 12s infinite alternate).
  - Floating paw prints ([`components/ui/FloatingPaws.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/ui/FloatingPaws.tsx)).
  - Expanding amber pulse ring on the CTA button (`.cta-pulse-ring`).

---

### Clinic Info ("Find Us")
- **File**: [`components/sections/ClinicInfo.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/ClinicInfo.tsx)
- **ID**: `id="clinic-info"`
- **Motion**:
  - Map card animates with circular clip reveal (`.map-clip-reveal`).
  - Pin icon drops from `y: -60` with spring bounce (`stiffness: 300, damping: 12`).
  - Animated ripple ring expands and fades under the pin.

---

### Contact Section & Form
- **File**: [`components/sections/Contact.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/sections/Contact.tsx)
- **ID**: `id="contact"`
- **Motion**:
  - Left column slides in (`-50px`); "Expert Support" badge gently floats vertically (`y: -6px`, 5s loop) and wiggles its headset icon.
  - Form card rises (`y: 80 -> 0`, `scale: 0.97 -> 1`).
  - Input field label lift on `:focus-within`.
  - "Send Message" button diagonal light sweep (`.contact-btn-shine`).

---

### Footer
- **File**: [`components/layout/Footer.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/layout/Footer.tsx)
- **Motion**:
  - Top 1px border line draws itself across (`scaleX: 0 -> 1`, `0.9s easeOut`).
  - 3 columns rise with index-based stagger (`0.15s`).
  - Paw icon wiggles slightly on hover.
  - Bottom bar links have sliding underline effect (`.footer-hover-link`).

---

## 7. Accessibility & SEO Standards

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements.
- **Link Integrity**: All nav links are real `<a>` or `next/link` components with valid `href="#id"`.
- **ARIA States**:
  - Active navigation links receive `aria-current="page"`.
  - Mobile menu toggle has `aria-expanded` and `aria-controls="mobile-menu"`.
  - Decorative icons and progress bars have `aria-hidden="true"`.
- **Keyboard Navigation**:
  - Unbroken tab index order.
  - Visible focus indicators via `focus-visible:ring-2` on all interactive links, buttons, and form inputs.
- **Color Contrast**: All text satisfies WCAG AA contrast ratio ($\ge 4.5:1$).
- **Reduced Motion**: Full graceful degradation for all CSS keyframes and Framer Motion transitions.

---

## 8. File Structure & Directory Map

```text
aleef-vet/
├── app/
│   ├── api/
│   │   └── contact/route.ts       # Contact form Resend email handler
│   ├── globals.css                # Design system tokens, utilities & custom animations
│   ├── layout.tsx                 # Root layout, Google Fonts, and ScrollProgress bar
│   ├── page.tsx                   # Main one-page landing page assembling all sections
│   ├── faq/page.tsx               # Dedicated FAQ page
│   ├── privacy-policy/page.tsx    # Privacy policy page
│   └── terms/page.tsx             # Terms of service page
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Navigation, active section tracker & mobile menu
│   │   └── Footer.tsx             # Footer with animated top border & link underlines
│   ├── sections/
│   │   ├── Hero.tsx               # #home
│   │   ├── Services.tsx           # #services
│   │   ├── About.tsx              # #about
│   │   ├── WhyChooseUs.tsx        # #why-choose-us (corner-converge 2x2 grid)
│   │   ├── Team.tsx               # #team
│   │   ├── Testimonials.tsx       # #testimonials
│   │   ├── CTA.tsx                # #cta
│   │   ├── ClinicInfo.tsx         # #clinic-info (map uncover & bouncy pin)
│   │   └── Contact.tsx            # #contact (form elevation & focus interactions)
│   └── ui/
│       ├── FloatingPaws.tsx       # Ambient drifting paw print SVGs
│       ├── Reveal.tsx             # Universal entrance animation wrapper
│       ├── ReviewMarquee.tsx      # Seamless continuous reviews marquee
│       └── ScrollProgress.tsx     # Top 3px spring scroll indicator
├── lib/
│   ├── motion.ts                  # Centralized motion physics tokens and variants
│   └── validations/contact.ts     # Zod schema for contact form validation
├── DEVELOPER_DOCUMENTATION.md     # This comprehensive developer reference
└── package.json                   # Project scripts and dependencies
```

---

## 9. Developer Commands & Maintenance

### Running the Development Server
```bash
npm run dev
```
Runs Next.js Turbopack at `http://localhost:3000`.

### Linting & Formatting Check
```bash
npm run lint
```

### Production Build & Type Check
```bash
npm run build
npm start
```

### Adding a New Section or Nav Link
1. Assign a unique `id` to the section container in `components/sections/YourSection.tsx` (e.g. `id="new-section"`).
2. If it belongs in the main header navigation, add it to `navLinks` in [`components/layout/Header.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/layout/Header.tsx).
3. If it is an intermediate section, add its id to `sectionToNavMap` in [`components/layout/Header.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/layout/Header.tsx) pointing to the nearest nav item.
4. Wrap any entrances in `<Reveal>` from [`components/ui/Reveal.tsx`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/components/ui/Reveal.tsx) or import standard variants from [`lib/motion.ts`](file:///c:/Users/HP/OneDrive/Desktop/Credo%20Design/aleef-vet/lib/motion.ts).
