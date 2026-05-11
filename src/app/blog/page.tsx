import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Lunar Market Insights | Blog",
  description: "Deep-dive articles and research on the intersection of Bitcoin price action and the lunar cycle.",
};

const articles = [
  {
    slug: "bitcoin-lunar-cycle-correlation-study",
    title: "Bitcoin and the Lunar Cycle: A 10-Year Correlation Study",
    excerpt: "Exploring the statistical relationship between synodic months and Bitcoin's historic bull runs. Is there a pattern in the noise?",
    date: "May 10, 2026",
    readTime: "8 min read",
    category: "Methodology"
  },
  {
    slug: "full-moon-volatility-crypto-markets",
    title: "Full Moon Volatility: Why Crypto Markets Cluster at Lunar Extremes",
    excerpt: "Analyzing the 'Lunar Effect' on market psychology. Why does volatility tend to peak when the moon is brightest?",
    date: "May 8, 2026",
    readTime: "6 min read",
    category: "Analysis"
  },
  {
    slug: "new-moon-trading-strategy-backtest",
    title: "The New Moon Alpha: Backtesting a Lunar Trading Strategy",
    excerpt: "We backtested a strategy that only accumulates during Waxing phases. The results might surprise you.",
    date: "May 5, 2026",
    readTime: "12 min read",
    category: "Strategy"
  },
  {
    slug: "institutional-crypto-trading-lunar-cycles",
    title: "Alternative Data: Do Institutions Track Lunar Cycles?",
    excerpt: "Exploring the use of esoteric data in algorithmic trading. From weather patterns to planetary cycles.",
    date: "May 2, 2026",
    readTime: "10 min read",
    category: "Insights"
  },
  {
    slug: "lunar-illumination-vs-trading-volume",
    title: "Lunar Illumination vs. Trading Volume: A Liquidity Analysis",
    excerpt: "Does the percentage of moonlight correlate with global Bitcoin liquidity? We look at the numbers.",
    date: "April 28, 2026",
    readTime: "7 min read",
    category: "Research"
  }
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl font-black uppercase tracking-tight mb-6">
              LUNAR MARKET <span className="text-bitcoin-gold">INSIGHTS</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deep-dive research, strategy backtesting, and exploratory analysis at the intersection of celestial cycles and digital finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/blog/${article.slug}`}
                className="group flex flex-col h-full card-premium p-8 hover:border-bitcoin-gold/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-bitcoin-gold/10 text-bitcoin-gold text-[10px] font-black uppercase tracking-widest rounded">
                    {article.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-bitcoin-gold transition-colors leading-tight">
                  {article.title}
                </h2>
                
                <p className="text-muted-foreground text-sm mb-8 flex-grow leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-bitcoin-gold group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
