import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { TrendingUp, Activity, BarChart3, Info } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Quick Stats / KPIs */}
        <section className="py-24 bg-dark-gray/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard 
                icon={<TrendingUp className="w-5 h-5 text-bitcoin-gold" />}
                label="Best Performing Phase"
                value="New Moon"
                subValue="+2.4% Avg Return"
              />
              <StatCard 
                icon={<Activity className="w-5 h-5 text-bitcoin-gold" />}
                label="Most Volatile Phase"
                value="Full Moon"
                subValue="+12% Volatility"
              />
              <StatCard 
                icon={<BarChart3 className="w-5 h-5 text-bitcoin-gold" />}
                label="Correlation Index"
                value="0.14"
                subValue="Low Correlation"
              />
              <StatCard 
                icon={<Activity className="w-5 h-5 text-bitcoin-gold" />}
                label="Moon Alpha Index™"
                value="104.2"
                subValue="Bullish Signal"
              />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-section mb-6 uppercase">The Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                MoonBitcoin was born from a simple question: "Does the lunar cycle affect global liquidity or investor psychology enough to impact Bitcoin?" While many dismiss this as superstition, we believe every dataset deserves an intellectually honest analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Feature 
                icon={<Info className="w-6 h-6 text-bitcoin-gold" />}
                title="Intellectually Honest"
                description="We don't sell signals or make financial claims. We present raw data and statistical correlations."
              />
              <Feature 
                icon={<BarChart3 className="w-6 h-6 text-bitcoin-gold" />}
                title="10 Years of Data"
                description="Our analysis spans over a decade of Bitcoin market history across all 8 lunar phases."
              />
              <Feature 
                icon={<Activity className="w-6 h-6 text-bitcoin-gold" />}
                title="Modern Statistics"
                description="Using standard deviation, volatility analysis, and return grouping to find patterns."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function StatCard({ icon, label, value, subValue }: { icon: React.ReactNode, label: string, value: string, subValue: string }) {
  return (
    <div className="card-premium p-6 hover:border-bitcoin-gold/30 transition-all group">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-3xl font-black text-white mb-1 group-hover:text-bitcoin-gold transition-colors">{value}</div>
      <div className="text-sm font-bold text-bitcoin-gold/60">{subValue}</div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 uppercase">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
