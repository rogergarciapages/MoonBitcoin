import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsChart from "@/components/AnalyticsChart";
import RangeSelector from "@/components/RangeSelector";
import AlphaComparisonChart from "@/components/AlphaComparisonChart";
import VolatilityBoxPlot from "@/components/VolatilityBoxPlot";
import VolumeHeatmap from "@/components/VolumeHeatmap";
import KpiGauge from "@/components/KpiGauge";
import LocalRangeSelector from "@/components/LocalRangeSelector";
import { Moon, TrendingUp, Activity, BarChart3, Zap, Shield } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ 
    range?: string;
    alphaRange?: string;
  }>;
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const { range = "1Y", alphaRange = "5Y" } = await searchParams;
  
  let dateFilter = {};
  const now = new Date();
  
  if (range === "30D") {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    dateFilter = { gte: thirtyDaysAgo };
  } else if (range === "1Y") {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    dateFilter = { gte: oneYearAgo };
  } else if (range === "5Y") {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(now.getFullYear() - 5);
    dateFilter = { gte: fiveYearsAgo };
  }

  const data = await prisma.dailyMarketData.findMany({
    where: { date: dateFilter },
    orderBy: { date: "asc" },
  });

  // Fetch specific data for Alpha Index if a different range is requested
  let alphaDateFilter = {};
  if (alphaRange === "1Y") {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    alphaDateFilter = { gte: oneYearAgo };
  } else if (alphaRange === "5Y") {
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(now.getFullYear() - 5);
    alphaDateFilter = { gte: fiveYearsAgo };
  }

  const alphaData = alphaRange === range 
    ? data 
    : await prisma.dailyMarketData.findMany({
        where: { date: alphaDateFilter },
        orderBy: { date: "asc" },
      });

  const phases = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
  ];

  const phaseStats = phases.map(phase => {
    const phaseData = data.filter(d => d.moonPhase === phase);
    if (phaseData.length === 0) return { phase, avgReturn: "0.00", avgVolatility: "0.00", count: 0 };
    
    const avgReturn = phaseData.reduce((acc, curr) => acc + (curr.dailyReturn || 0), 0) / phaseData.length;
    const avgVolatility = phaseData.reduce((acc, curr) => acc + (curr.volatility || 0), 0) / phaseData.length;
    
    return {
      phase,
      avgReturn: avgReturn.toFixed(2),
      avgVolatility: avgVolatility.toFixed(2),
      count: phaseData.length
    };
  });

  // --- KPI CALCULATIONS ---
  
  // 1. Moon Alpha Calculation
  let bh = 100, ls = 100;
  data.forEach(d => {
    const r = d.dailyReturn || 0;
    bh *= (1 + r / 100);
    if (d.moonPhase?.includes("Waxing") || d.moonPhase === "New Moon" || d.moonPhase === "First Quarter") {
      ls *= (1 + r / 100);
    }
  });
  const alphaEdge = ((ls / bh) - 1) * 100;

  // 2. Volatility Clustering
  const extremePhases = ["New Moon", "Full Moon"];
  const avgVolExtreme = data.filter(d => extremePhases.includes(d.moonPhase || "")).reduce((a, b) => a + (b.volatility || 0), 0) / (data.filter(d => extremePhases.includes(d.moonPhase || "")).length || 1);
  const avgVolNormal = data.filter(d => !extremePhases.includes(d.moonPhase || "")).reduce((a, b) => a + (b.volatility || 0), 0) / (data.filter(d => !extremePhases.includes(d.moonPhase || "")).length || 1);
  const volClustering = (avgVolExtreme / (avgVolNormal || 1)) * 10; 

  // 3. Liquidity Boost
  const avgVolFull = data.filter(d => d.moonPhase === "Full Moon").reduce((a, b) => a + (b.volumeUsd || 0), 0) / (data.filter(d => d.moonPhase === "Full Moon").length || 1);
  const avgVolTotal = data.reduce((a, b) => a + (b.volumeUsd || 0), 0) / (data.length || 1);
  const liquidityBoost = ((avgVolFull / (avgVolTotal || 1)) - 1) * 100;

  // 4. Pearson Correlation
  const returns = data.map(d => d.dailyReturn || 0);
  const illum = data.map(d => d.moonIllumination || 0);
  const meanR = returns.reduce((a, b) => a + b, 0) / (returns.length || 1);
  const meanI = illum.reduce((a, b) => a + b, 0) / (illum.length || 1);
  const num = returns.reduce((acc, r, i) => acc + (r - meanR) * (illum[i] - meanI), 0);
  const den = Math.sqrt(returns.reduce((acc, r) => acc + Math.pow(r - meanR, 2), 0)) * Math.sqrt(illum.reduce((acc, i) => acc + Math.pow(i - meanI, 2), 0));
  const correlation = (num / (den || 1)) * 100;

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-bitcoin-gold/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-bitcoin-gold" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight">Advanced <span className="text-bitcoin-gold">Analytics</span></h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Exploring the relationship between Bitcoin price action and the lunar cycle across multiple timeframes.
              </p>
            </div>
            
            <Suspense fallback={<div className="h-10 w-64 bg-white/5 animate-pulse rounded-xl" />}>
              <RangeSelector />
            </Suspense>
          </header>

          <div className="grid grid-cols-1 gap-12 mb-20">
            <section className="card-premium p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-8">
                <Moon className="w-5 h-5 text-bitcoin-gold" />
                Price + Moon Overlay
              </h2>
              <AnalyticsChart data={data.map(d => ({ ...d, date: d.date.toISOString() }))} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section className="card-premium p-8">
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-bitcoin-gold" />
                      Moon Alpha Index™
                    </h2>
                    <p className="text-sm text-muted-foreground">Comparing a lunar-optimized strategy against standard Buy & Hold.</p>
                  </div>
                  <LocalRangeSelector paramName="alphaRange" current={alphaRange} />
                </div>
                <AlphaComparisonChart data={alphaData.map(d => ({ ...d, date: d.date.toISOString() }))} />
              </section>

              <section className="card-premium p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-bitcoin-gold" />
                    Volatility Dispersion
                  </h2>
                  <p className="text-sm text-muted-foreground">Identifying which phases cluster the most extreme market moves.</p>
                </div>
                <VolatilityBoxPlot data={data.map(d => ({ ...d, date: d.date.toISOString() }))} />
              </section>
            </div>
            
            <section className="card-premium p-8">
              <div className="mb-6 text-center max-w-2xl mx-auto">
                <h2 className="text-xl font-bold uppercase tracking-tight flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-bitcoin-gold" />
                  Liquidity & Illumination
                </h2>
                <p className="text-sm text-muted-foreground">Scatter plot of illumination percentage vs daily trading volume.</p>
              </div>
              <VolumeHeatmap data={data.map(d => ({ ...d, date: d.date.toISOString() }))} />
            </section>
          </div>

          <section className="py-24 border-t border-white/5">
            <h2 className="text-3xl font-black uppercase mb-16 text-center">Data <span className="text-bitcoin-gold">Conclusions</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ConclusionCard 
                title="Moon Alpha Backtesting"
                conclusion="While the lunar strategy shows periods of significant outperformance, it often suffers from 'time-out-of-market' risk. The data suggests that while waxing phases are historically bullish, they do not consistently provide enough alpha."
                gauge={<KpiGauge value={alphaEdge} label="Strategy Edge" max={20} unit="%" />}
              />
              <ConclusionCard 
                title="Volatility Event Clustering"
                conclusion="There is a noticeable clustering of high-volatility events around the New Moon and Full Moon phases. This suggests that lunar extremes may serve as a psychological proxy for market 'inflection points'."
                gauge={<KpiGauge value={volClustering} label="Risk Intensity" max={20} unit="" />}
              />
              <ConclusionCard 
                title="Liquidity Surge Analysis"
                conclusion="Volume data shows a low but positive correlation with moon illumination. Trading activity tends to increase during high illumination periods (Full Moon cycles)."
                gauge={<KpiGauge value={liquidityBoost} label="Volume Surge" max={25} unit="%" />}
              />
              <ConclusionCard 
                title="Pearson Correlation Indexing"
                conclusion="With a current index, the overall correlation remains statistically 'weak.' However, its persistence over time suggests a non-zero relationship that functions as a 'noise factor'."
                gauge={<KpiGauge value={Math.abs(correlation)} label="Correlation Strength" max={100} unit="%" />}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ConclusionCard({ title, conclusion, gauge }: { title: string, conclusion: string, gauge?: React.ReactNode }) {
  return (
    <div className="p-8 card-premium hover:border-bitcoin-gold/20 transition-all flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider border-b border-white/5 pb-4">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{conclusion}</p>
      </div>
      {gauge && (
        <div className="w-full md:w-48 flex-shrink-0">
          {gauge}
        </div>
      )}
    </div>
  );
}

function InsightCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="card-premium p-6 border-l-4 border-l-bitcoin-gold">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-bold uppercase text-sm tracking-wider">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
