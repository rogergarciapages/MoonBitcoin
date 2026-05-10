# instructions.md

# MoonBitcoin — Technical Project Specification

## Project Overview

MoonBitcoin is a web-based exploratory data analysis platform that investigates potential correlations between Bitcoin market behavior and lunar cycles.

The project combines:
- cryptocurrency market data
- astronomy data
- time-series analysis
- statistical visualization
- SEO-focused content architecture

The platform is intentionally framed as:

> a fun, intellectually honest data-analysis experiment

—not as financial advice or pseudoscience.

---

# Core Concept

The application collects:
- daily Bitcoin market data
- daily moon phase data

Then combines both datasets into a unified time-series database to analyze:
- price movement
- volatility
- returns
- trading behavior
- moon phases
- moon illumination

The frontend presents:
- interactive charts
- KPIs
- statistical summaries
- visual moon overlays
- blog content

---

# Technical Stack

## Frontend
- Next.js 15+
- React
- TailwindCSS
- shadcn/ui
- Recharts or Apache ECharts

## Backend
- Next.js Route Handlers
- Scheduled cron jobs
- REST API ingestion layer

## Database
Recommended:
- PostgreSQL

Alternative:
- SQLite for MVP

## Deployment
Recommended:
- Vercel
- VPS + Docker
- Coolify compatible

---

# APIs

## Primary Bitcoin API

Use ONLY:

## CoinGecko API

Official site:
https://www.coingecko.com/en/api

### Why CoinGecko
- free tier is sufficient
- reliable
- historical BTC pricing
- no exchange lock-in
- excellent documentation
- simple REST structure

---

# Bitcoin Data Requirements

## Required Endpoint

```bash
/api/v3/coins/bitcoin/market_chart
```

### Example

```bash
https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365
```

---

# Fiat Currency

## Supported Fiat
Only:

```txt
USD
```

No multi-currency support initially.

This simplifies:
- API architecture
- caching
- KPI consistency
- frontend complexity
- statistical normalization

---

# Bitcoin Fetch Strategy

## IMPORTANT DESIGN DECISION

The project does NOT require minute-level or hourly trading data.

This is a daily-cycle analysis project.

Moon phases change slowly and operate on daily astronomical cycles.

Therefore:

## Recommended Fetch Frequency

### Once per day

Recommended schedule:

```txt
00:15 UTC
```

This allows:
- stable daily candles
- reduced API usage
- cleaner statistical analysis
- simpler backend logic

---

# Data Granularity

## Store Daily Candles Only

Required fields:

```ts
type BitcoinDailyData = {
  date: string
  priceUsd: number
  marketCapUsd: number
  volumeUsd: number
}
```

---

# Moon API

## Recommended API

Use:

## WeatherAPI Astronomy API

Official site:
https://www.weatherapi.com/

---

# Required Moon Data

```ts
type MoonData = {
  date: string
  moonPhase: string
  moonIllumination: number
}
```

---

# Supported Moon Phases

```txt
New Moon
Waxing Crescent
First Quarter
Waxing Gibbous
Full Moon
Waning Gibbous
Last Quarter
Waning Crescent
```

---

# Moon Fetch Strategy

## Fetch Frequency
Once daily.

Moon phases do not require high-frequency updates.

---

# Unified Dataset

The backend merges both APIs into a normalized dataset.

## Final Data Structure

```ts
type MoonBitcoinRecord = {
  date: string

  // Bitcoin
  priceUsd: number
  marketCapUsd: number
  volumeUsd: number

  // Moon
  moonPhase: string
  moonIllumination: number

  // Calculated Metrics
  dailyReturn: number
  volatility: number
}
```

---

# Database Schema

## Table: daily_market_data

```sql
CREATE TABLE daily_market_data (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,

    price_usd NUMERIC,
    market_cap_usd NUMERIC,
    volume_usd NUMERIC,

    moon_phase VARCHAR(50),
    moon_illumination NUMERIC,

    daily_return NUMERIC,
    volatility NUMERIC,

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

# Backend Architecture

## Cron Job Pipeline

```txt
CRON JOB
    ↓
Fetch CoinGecko BTC data
    ↓
Fetch Moon API data
    ↓
Normalize datasets
    ↓
Compute metrics
    ↓
Store in PostgreSQL
    ↓
Frontend reads cached DB
```

---

# IMPORTANT

The frontend should NEVER directly call external APIs for core analytics.

Reasons:
- rate limiting
- duplicated requests
- inconsistent data
- slower performance
- worse SEO

The frontend should read ONLY from internal APIs/database.

---

# Statistical Features

## Phase-Based Analysis

Calculate:
- average BTC return per moon phase
- average volatility per phase
- bullish vs bearish frequency
- best performing phase
- worst performing phase

---

# Suggested Statistical Methods

## MVP
- average returns
- standard deviation
- volatility
- phase grouping

## Future Improvements
- Pearson correlation
- Spearman correlation
- rolling correlations
- event studies
- backtesting

---

# KPI Examples

## Homepage KPIs

Examples:

```txt
Best Performing Moon Phase
Most Volatile Moon Phase
Average BTC Return During Full Moon
Moon Illumination vs Volatility
Moon Alpha Index™
```

---

# Frontend Pages

# Homepage

Purpose:
- viral/shareable landing page
- hero chart
- summary KPIs

Sections:
- hero visualization
- moon/BTC overlay chart
- KPIs
- explanation section
- latest insights

---

# Analytics Page

Contains:
- interactive charts
- filters
- moon phase comparisons
- historical analysis

---

# Blog Section

SEO-focused articles.

Examples:
- Does the Moon Affect Bitcoin?
- Full Moon vs Bitcoin Volatility
- 10 Years of Lunar Bitcoin Data
- Bitcoin Trading by Moon Phase

---

# Charts Required

## 1. BTC Price + Moon Overlay
Primary hero chart.

## 2. Moon Phase Return Comparison
Bar chart.

## 3. Volatility by Moon Phase
Box plot or grouped bars.

## 4. Heatmap
Moon phase vs returns.

---

# SEO Requirements

## Critical

The site should be:
- server-side rendered
- metadata optimized
- sitemap generated
- OpenGraph optimized

---

# Branding Tone

The project should feel:
- playful
- intelligent
- data-driven
- experimental

Avoid:
- conspiracy framing
- financial promises
- pseudoscientific claims

---

# Suggested Folder Structure

```txt
/app
  /api
  /analytics
  /blog

/components
/lib
/services
/scripts
/types
/database

/jobs
  fetchBitcoin.ts
  fetchMoon.ts
  processMetrics.ts
```

---

# Recommended MVP Timeline

## Phase 1 — MVP
- API ingestion
- DB setup
- one chart
- basic landing page

## Phase 2
- analytics dashboard
- KPI engine
- advanced charts

## Phase 3
- backtesting
- AI insights
- social sharing
- newsletter

---

# Recommended Initial Scope

KEEP IT SIMPLE.

Do NOT initially build:
- user accounts
- authentication
- live streaming prices
- multi-currency support
- portfolio tracking
- trading bots

The value of the project is:
- data storytelling
- visualization
- statistical exploration
- presentation quality

---

# Recommended Data History

Initial import:

```txt
10 years of BTC historical daily data
```

Then:

```txt
1 fetch per day
```

This is enough for statistically meaningful analysis while remaining lightweight and cheap.

---

# Final Objective

MoonBitcoin should function as:
- a developer portfolio project
- a data-analysis showcase
- an SEO experiment
- a viral curiosity project
- a modern analytics web app

The project demonstrates competency in:
- fullstack development
- API integration
- statistics
- data engineering
- frontend visualization
- product architecture

