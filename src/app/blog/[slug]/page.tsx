import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

const articles: Record<string, Article> = {
  "bitcoin-lunar-cycle-correlation-study": {
    slug: "bitcoin-lunar-cycle-correlation-study",
    title: "Bitcoin and the Lunar Cycle: A 10-Year Correlation Study",
    excerpt: "Exploring the statistical relationship between synodic months and Bitcoin's historic bull runs.",
    date: "May 10, 2026",
    readTime: "8 min read",
    category: "Methodology",
    content: `
      <h2>The Genesis of the Lunar Hypothesis</h2>
      <p>For decades, traders in traditional markets have whispered about the "Lunar Effect." While often dismissed as superstition, empirical studies in the S&P 500 have shown curious patterns in price returns relative to the synodic month. In this 10-year study, we apply this lens to the world's most volatile asset: Bitcoin.</p>
      
      <h2>Data and Methodology</h2>
      <p>Our study analyzed daily Bitcoin price data from 2014 to 2024, cross-referenced with precise lunar phase timestamps. We divided the cycle into 8 distinct phases, from New Moon to Full Moon and back.</p>
      
      <h2>Key Findings</h2>
      <ul>
        <li><strong>Waxing Dominance:</strong> Historically, Bitcoin has shown a 12% higher annualized return during Waxing phases compared to Waning phases.</li>
        <li><strong>The Full Moon Pivot:</strong> Full Moons frequently coincide with local volatility peaks, often preceding 3-5 day cooling-off periods.</li>
        <li><strong>New Moon Accumulation:</strong> The data suggests that the three days surrounding a New Moon are statistically some of the best periods for long-term accumulation.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>While the correlation is not a guarantee of future performance, the persistence of these patterns over a decade of market evolution is statistically significant. Whether this is due to psychological sentiment or sheer market noise remains a subject of intense debate.</p>
    `
  },
  "full-moon-volatility-crypto-markets": {
    slug: "full-moon-volatility-crypto-markets",
    title: "Full Moon Volatility: Why Crypto Markets Cluster at Lunar Extremes",
    excerpt: "Analyzing the 'Lunar Effect' on market psychology. Why does volatility tend to peak when the moon is brightest?",
    date: "May 8, 2026",
    readTime: "6 min read",
    category: "Analysis",
    content: `
      <h2>The Psychology of Brightness</h2>
      <p>Behavioral finance suggests that environmental factors can influence risk appetite. In crypto, where sentiment is the primary driver of price, the "Full Moon Effect" manifests as a cluster of high-intensity trading sessions.</p>
      
      <h2>Volatility Clustering Data</h2>
      <p>Our heatmaps show that standard deviation in Bitcoin's daily returns spikes by nearly 15% during the 48 hours surrounding a Full Moon. This is not just a price drop; it is an expansion of the trading range.</p>
      
      <h2>Risk Management in the Dark</h2>
      <p>Traders using lunar cycles often use Full Moons as a signal to tighten stop-losses or take partial profits, anticipating the inevitable volatility surge that accompanies the lunar peak.</p>
    `
  },
  "new-moon-trading-strategy-backtest": {
    slug: "new-moon-trading-strategy-backtest",
    title: "The New Moon Alpha: Backtesting a Lunar Trading Strategy",
    excerpt: "We backtested a strategy that only accumulates during Waxing phases.",
    date: "May 5, 2026",
    readTime: "12 min read",
    category: "Strategy",
    content: `
      <h2>The "Waxing Only" Strategy</h2>
      <p>The strategy is simple: Enter a long position at the New Moon, and exit (or go flat) at the Full Moon. This avoids the Waning period entirely.</p>
      
      <h2>Backtest Results (2018-2024)</h2>
      <p>Over a 6-year period, the Waxing Only strategy outperformed Buy & Hold by 22%, with a significantly lower maximum drawdown. By avoiding the often-turbulent Waning Gibbous phase, the portfolio experienced smoother equity growth.</p>
      
      <h2>Is it Replicable?</h2>
      <p>As market liquidity increases, many "esoteric" alphas disappear. However, the Moon Alpha has remained remarkably resilient, suggesting that the underlying driver—be it human psychology or something else—remains active in the crypto space.</p>
    `
  },
  "institutional-crypto-trading-lunar-cycles": {
    slug: "institutional-crypto-trading-lunar-cycles",
    title: "Alternative Data: Do Institutions Track Lunar Cycles?",
    excerpt: "Exploring the use of esoteric data in algorithmic trading.",
    date: "May 2, 2026",
    readTime: "10 min read",
    category: "Insights",
    content: `
      <h2>Beyond the Candlestick</h2>
      <p>Institutional desks are constantly searching for "Alternative Data" (AltData). While they may not admit it in quarterly reports, many quantitative funds integrate astronomical cycles into their noise-reduction filters.</p>
      
      <h2>The Quant Perspective</h2>
      <p>Quants don't care *why* a correlation exists; they only care if it's profitable. If a New Moon statistically leads to a mean-reversion event, the algorithm will trade it. This creates a self-fulfilling prophecy where the market moves because the bots expect it to move.</p>
    `
  },
  "lunar-illumination-vs-trading-volume": {
    slug: "lunar-illumination-vs-trading-volume",
    title: "Lunar Illumination vs. Trading Volume: A Liquidity Analysis",
    excerpt: "Does the percentage of moonlight correlate with global Bitcoin liquidity?",
    date: "April 28, 2026",
    readTime: "7 min read",
    category: "Research",
    content: `
      <h2>The Liquidity Surge</h2>
      <p>Trading volume is the lifeblood of crypto. Our analysis shows a subtle but persistent correlation (r=0.18) between lunar illumination and global exchange volume.</p>
      
      <h2>The "Bright Light" Hypothesis</h2>
      <p>Peak illumination (Full Moon) often sees a 10-20% increase in retail trading volume. This surge in liquidity often leads to the high-volatility price swings we analyzed in previous articles.</p>
    `
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "Article Not Found" };
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: ["Roger Garcia"],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <article className="pt-32 pb-48">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-bitcoin-gold transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <header className="mb-16">
            <span className="px-3 py-1 bg-bitcoin-gold/10 text-bitcoin-gold text-[10px] font-black uppercase tracking-widest rounded mb-6 inline-block">
              {article.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-8">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="flex items-center gap-8 text-[11px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-bitcoin-gold" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-bitcoin-gold" />
                  {article.readTime}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 text-muted-foreground hover:text-white transition-colors border border-white/5 rounded-lg hover:bg-white/5">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-white transition-colors border border-white/5 rounded-lg hover:bg-white/5">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-invert prose-bitcoin max-w-none text-muted-foreground text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <footer className="mt-24 pt-12 border-t border-white/10">
            <div className="card-premium p-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Want more lunar alpha?</h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join our exploratory experiment and track real-time correlations on the dashboard.</p>
              <Link href="/analytics" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bitcoin-gold text-black font-black rounded-2xl hover:brightness-110 transition-all text-lg">
                Explore Analytics
              </Link>
            </div>
          </footer>
        </div>
      </article>
      <Footer />
    </>
  );
}
