# 🌑 MoonBitcoin: Lunar Market Intelligence

[![GitHub stars](https://img.shields.io/github/stars/rogergarciapages/MoonBitcoin?style=for-the-badge&color=FFC31C&labelColor=000000)](https://github.com/rogergarciapages/MoonBitcoin/stargazers)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

> **100% Data-Driven. 0% Financial Advice.**  
> An exploratory data experiment investigating the potential correlations between Bitcoin market behavior and the lunar cycle.

---
![alt text](image.png)
## ✨ Overview

MoonBitcoin is a sophisticated analytical engine designed to visualize and backtest the "Lunar Hypothesis" in the Bitcoin market. By integrating high-fidelity lunar data with over 10 years of historical market price action, this platform provides a premium, interactive environment for data-driven exploration.

### 🌓 Live Moon Visualizer
The hero of the platform is a real-time, high-definition moon visual that reflects the actual phase and illumination of the current date. 
- **Realistic Geometry**: Implements a "Terminator Line" shader with curved shading for an authentic 3D lunar look.
- **Dynamic Correlation**: Provides immediate Buy/Sell signals based on historical alpha trends associated with the current phase.

---

## 📊 Advanced Analytics Suite

The analytics dashboard offers deep insights through four core KPI engines:

1.  **Moon Alpha Index™**: A comprehensive backtesting engine comparing a lunar-optimized strategy (Accumulating in Waxing, Neutral in Waning) against a standard Buy & Hold strategy.
2.  **Volatility Dispersion**: Statistical analysis of market risk, identifying which moon phases cluster the most extreme price movements.
3.  **Liquidity & Illumination**: Heatmap correlation between lunar brightness and global Bitcoin trading volume.
4.  **Pearson Correlation Indexing**: Real-time statistical indexing of the mathematical relationship between lunar cycles and market returns.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Premium Dark Mode)
- **Database**: [Prisma](https://www.prisma.io/) + [SQLite](https://sqlite.org/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rogergarciapages/MoonBitcoin.git
    cd MoonBitcoin
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup the database**:
    ```bash
    npx prisma db push
    ```

4.  **Seed 10-year historical data**:
    ```bash
    npx tsx src/scripts/seed-10y.ts
    ```

5.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📖 Methodology

The platform utilizes the **Synodic Month** cycle (approx. 29.53 days) to divide market data into 8 distinct phases. Returns and volatility are calculated daily and aggregated to provide a statistically significant view of market behavior relative to the lunar illumination.

---

## ⚖️ Disclaimer

This project is purely for educational and experimental purposes. The correlations shown are historical and statistical in nature. **This is not financial advice.** Always conduct your own research before making investment decisions.

---

## 🌟 Support the Project

If you find this data experiment interesting, please consider giving the repository a **Star**!

Developed with 🌑 by [Roger Garcia](https://github.com/rogergarciapages)
