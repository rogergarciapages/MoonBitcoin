import { TrendingUp, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-bitcoin-gold/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bitcoin-gold/10 border border-bitcoin-gold/20 mb-6">
              <Zap className="w-4 h-4 text-bitcoin-gold" />
              <span className="text-xs font-bold text-bitcoin-gold uppercase tracking-wider">Experimental Data Analysis</span>
            </div>
            
            <h1 className="text-hero mb-8">
              BITCOIN MEETS THE <br />
              <span className="text-bitcoin-gold">LUNAR CYCLE</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              An exploratory experiment investigating potential correlations between Bitcoin market behavior and lunar phases. 100% data-driven, 0% financial advice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/analytics" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bitcoin-gold text-black font-black rounded-2xl hover:brightness-110 transition-all text-lg group"
              >
                Launch Analytics
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg"
              >
                Read Methodology
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-12">
              <div>
                <p className="text-2xl font-black text-white">10Y+</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Historical Data</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">8</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Moon Phases</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Open Source</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Mock Chart Visualization */}
            <div className="card-premium p-8 aspect-square lg:aspect-[4/3] flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              
              {/* Fake Chart Lines */}
              <div className="absolute inset-x-8 top-20 bottom-32 flex items-end justify-between gap-1">
                {[40, 45, 38, 52, 60, 58, 65, 75, 70, 85, 95, 88, 92, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-bitcoin-gold/20 rounded-t-sm relative group-hover:bg-bitcoin-gold/30 transition-colors"
                    style={{ height: `${h}%` }}
                  >
                    {i % 4 === 0 && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <Moon className="w-3 h-3 text-white fill-white" />
                        </div>
                        <div className="w-px h-6 bg-white/20 mt-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="relative z-20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-bitcoin-gold" />
                  <span className="text-sm font-bold text-bitcoin-gold uppercase tracking-wider">Correlation Alert</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Full Moon Volatility Peak</h3>
                <p className="text-muted-foreground text-sm">Historical data shows a 12% increase in average volatility during full moon phases over the last 10 years.</p>
              </div>
              
              {/* Decorative Moon */}
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute top-14 right-14 w-12 h-12 rounded-full bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
