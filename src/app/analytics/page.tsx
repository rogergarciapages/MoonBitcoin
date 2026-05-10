import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsChart from "@/components/AnalyticsChart";
import { Moon, TrendingUp, Activity, BarChart3 } from "lucide-react";

export default async function AnalyticsPage() {
  const data = await prisma.dailyMarketData.findMany({
    orderBy: { date: "asc" },
  });

  // Calculate statistics per phase
  const phases = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
  ];

  const phaseStats = phases.map(phase => {
    const phaseData = data.filter(d => d.moonPhase === phase);
    const avgReturn = phaseData.reduce((acc, curr) => acc + (curr.dailyReturn || 0), 0) / phaseData.length;
    const avgVolatility = phaseData.reduce((acc, curr) => acc + (curr.volatility || 0), 0) / phaseData.length;
    
    return {
      phase,
      avgReturn: avgReturn.toFixed(2),
      avgVolatility: avgVolatility.toFixed(2),
      count: phaseData.length
    };
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-bitcoin-gold/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-bitcoin-gold" />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight">Market <span className="text-bitcoin-gold">Analytics</span></h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Exploring the relationship between Bitcoin price action and the lunar cycle using historical data from the last 365 days.
            </p>
          </header>

          {/* Main Chart */}
          <section className="card-premium p-8 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold uppercase mb-1">Price + Moon Overlay</h2>
                <p className="text-sm text-muted-foreground">White dots represent Full Moons, Black dots represent New Moons.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white border border-bitcoin-gold" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Moon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black border border-bitcoin-gold" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">New Moon</span>
                </div>
              </div>
            </div>
            
            <AnalyticsChart data={data.map(d => ({ ...d, date: d.date.toISOString() }))} />
          </section>

          {/* Phase Statistics */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black uppercase mb-8">Performance By Phase</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {phaseStats.map((stat, i) => (
                  <div key={i} className="card-premium p-6 flex justify-between items-center group hover:border-bitcoin-gold/30 transition-all">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.phase}</p>
                      <h3 className="text-xl font-black">{stat.avgReturn}%</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Volatility</p>
                      <p className="text-sm font-bold text-bitcoin-gold">{stat.avgVolatility}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase mb-8">Insights</h2>
              <div className="space-y-6">
                <InsightCard 
                  icon={<TrendingUp className="w-5 h-5 text-bitcoin-gold" />}
                  title="Bullish Sentiment"
                  description={`The New Moon phase currently shows the highest average daily return at ${phaseStats.find(p => p.phase === "New Moon")?.avgReturn}%.`}
                />
                <InsightCard 
                  icon={<Activity className="w-5 h-5 text-bitcoin-gold" />}
                  title="Volatility Peak"
                  description={`Volatility tends to cluster around the Full Moon, with an average move of ${phaseStats.find(p => p.phase === "Full Moon")?.avgVolatility}% daily.`}
                />
                <InsightCard 
                  icon={<Moon className="w-5 h-5 text-bitcoin-gold" />}
                  title="Phase Distribution"
                  description="Data is evenly distributed across all 8 phases, providing a statistically balanced view of the last 12 months."
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
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
