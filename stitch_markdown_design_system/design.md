# DESIGN.md

# MoonBitcoin — Design System & UI Specification

## Design Philosophy

MoonBitcoin should visually feel like:
- modern fintech
- data-science dashboard
- crypto analytics platform
- minimalist editorial design
- experimental but professional

The interface must communicate:
- credibility
- technical sophistication
- clarity
- modern startup aesthetics
- strong visual identity

The visual direction should blend:
- modern SaaS dashboards
- Bloomberg / TradingView inspiration
- Apple-like spacing and minimalism
- crypto-native aesthetics
- astronomy-inspired atmosphere

The design must NOT feel:
- gimmicky
- conspiracy-oriented
- meme-heavy
- cluttered
- noisy

---

# Core Design Principles

## 1. Minimalism
Large spacing.
Clean layouts.
Strong typography.
Minimal decorative elements.

## 2. Data First
Charts and analytics are the visual focus.
The UI should support the data, not overpower it.

## 3. Dark Mode Native
The project should feel designed for dark mode first.
Light mode must still look premium.

## 4. Mobile First
The entire platform must be fully responsive.

Responsive breakpoints should prioritize:
- mobile
- tablet
- ultrawide desktop dashboards

---

# Design Stack

## Required Technologies

- TailwindCSS
- shadcn/ui
- Lucide Icons
- Recharts OR Apache ECharts
- Framer Motion (subtle only)

---

# Typography

## Primary Typography

Preferred stack:

```css
font-family: Helvetica, Roboto, Arial, sans-serif;
```

---

# Typography Style

The typography should be:
- bold
- clean
- highly legible
- modern
- slightly compressed feeling
- high contrast

Avoid:
- thin fonts
- decorative fonts
- futuristic unreadable fonts
- serif fonts

---

# Typography Hierarchy

## Hero Titles

Style:
- very large
- bold
- high visual impact
- tight line height

Suggested Tailwind:

```txt
text-5xl md:text-7xl font-black tracking-tight
```

---

## Section Titles

```txt
text-2xl md:text-4xl font-bold tracking-tight
```

---

## Body Text

```txt
text-base leading-relaxed text-muted-foreground
```

---

# Color Palette

## Official Palette

### Pure White

```txt
#FFFFFF
```

Usage:
- light backgrounds
- typography on dark mode
- contrast elements

---

### Bitcoin Gold

```txt
#FFC31C
```

Usage:
- primary accent
- buttons
- highlights
- KPI emphasis
- active states
- moon illumination visuals

This is the signature brand color.

---

### Medium Gray

```txt
#474747
```

Usage:
- secondary surfaces
- cards
- muted UI blocks

---

### Dark Gray

```txt
#242424
```

Usage:
- primary dark surfaces
- charts background
- dashboard containers

---

### Pure Black

```txt
#000000
```

Usage:
- body background in dark mode
- hero sections
- cinematic contrast

---

# Light Mode Theme

## Background

```txt
#FFFFFF
```

## Primary Text

```txt
#000000
```

## Secondary Text

```txt
#474747
```

## Accent

```txt
#FFC31C
```

## Card Backgrounds

```txt
#F5F5F5
```

## Borders

```txt
rgba(0,0,0,0.08)
```

---

# Dark Mode Theme

## Background

```txt
#000000
```

## Surface

```txt
#242424
```

## Elevated Surface

```txt
#474747
```

## Primary Text

```txt
#FFFFFF
```

## Secondary Text

```txt
rgba(255,255,255,0.70)
```

## Accent

```txt
#FFC31C
```

---

# Layout System

## Global Layout Width

Recommended:

```txt
max-w-7xl
```

Centered layout with generous horizontal padding.

---

# Spacing Philosophy

Use:
- large whitespace
- breathing room
- oversized sections
- modern editorial spacing

Avoid:
- cramped dashboards
- tiny cards
- excessive borders

---

# Card Design

## Card Style

Cards should feel:
- modern
- soft
- elevated
- premium

Recommended Tailwind style:

```txt
rounded-2xl border border-white/10 bg-[#242424] shadow-xl
```

Light mode equivalent should use soft gray backgrounds.

---

# Shadows

Use subtle shadows only.

Avoid:
- harsh neumorphism
- cartoon shadows
- heavy glow effects

---

# Buttons

## Primary Buttons

Style:
- bold
- strong contrast
- high readability

Suggested:

```txt
bg-[#FFC31C] text-black font-bold rounded-xl
```

Hover:

```txt
brightness-110
```

---

## Secondary Buttons

Dark mode:

```txt
bg-[#242424] border border-white/10 text-white
```

Light mode:

```txt
bg-white border border-black/10 text-black
```

---

# Charts & Visualization

## IMPORTANT

Charts are the core visual identity of the platform.

Charts must look:
- cinematic
- premium
- clean
- highly readable
- modern

---

# Chart Theme

## BTC Line Color

```txt
#FFC31C
```

## Grid Lines

Dark mode:

```txt
rgba(255,255,255,0.08)
```

Light mode:

```txt
rgba(0,0,0,0.06)
```

---

# Moon Visual Elements

Use subtle moon-inspired UI elements.

Examples:
- phase icons
- illumination gradients
- circular indicators
- lunar overlays on charts

Avoid:
- cheesy space illustrations
- cartoon moons
- excessive stars everywhere

---

# Hero Section

## Objective

The homepage hero must instantly communicate:
- Bitcoin
- moon cycles
- analytics
- modern fintech

---

# Hero Composition

Recommended layout:

Left:
- headline
- description
- CTA buttons

Right:
- large animated chart
- moon overlay
- BTC trend visualization

---

# Hero Background

Dark mode hero should use:

```txt
#000000
```

Optional subtle gradients:

```css
background: radial-gradient(circle at top, rgba(255,195,28,0.12), transparent 50%);
```

---

# Motion & Animation

## Motion Philosophy

Animations should feel:
- subtle
- smooth
- premium
- professional

Avoid:
- excessive motion
- flashy transitions
- distracting animation loops

---

# Recommended Animations

- fade-in sections
- subtle chart animation
- hover transitions
- smooth KPI counters
- gentle moon glow

---

# Responsive Design

## Mobile Requirements

The platform MUST work flawlessly on:
- phones
- tablets
- ultrawide monitors

---

# Mobile Layout Rules

## Mobile
- stacked layouts
- single-column dashboards
- swipeable charts if necessary

## Desktop
- multi-column dashboards
- larger chart focus
- side-by-side KPI layouts

---

# Navigation

## Navbar Style

Minimal.
Sticky.
Semi-transparent optional.

Suggested:

```txt
backdrop-blur-md bg-black/50
```

---

# Footer

Simple and editorial.

Include:
- disclaimer
- social links
- GitHub
- project explanation

---

# Branding Tone

The visual branding should feel:
- analytical
- experimental
- intelligent
- crypto-native
- slightly mysterious
- premium startup

NOT:
- meme coin
- astrology scam
- retail trading guru
- conspiracy channel

---

# UI Inspiration References

The UI should take inspiration from:
- Stripe
- Vercel
- Linear
- TradingView
- Coinbase
- Arc Browser
- Bloomberg Terminal minimalism

---

# Accessibility

## Critical Accessibility Requirements

- proper contrast ratios
- keyboard navigation
- semantic HTML
- responsive typography
- screen-reader friendly labels

---

# Performance Requirements

The frontend should prioritize:
- fast loading
- SSR rendering
- optimized charts
- lazy-loaded components
- image optimization
- smooth mobile performance

---

# Final Design Goal

MoonBitcoin should visually feel like:

> a premium crypto analytics startup focused on lunar market experimentation.

The final experience should combine:
- bold typography
- cinematic charts
- minimalist layouts
- premium spacing
- modern SaaS aesthetics
- data-science credibility

