import Link from "next/link";
import { Moon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-bitcoin-gold rounded-lg">
                <Moon className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Moon<span className="text-bitcoin-gold">Bitcoin</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              An exploratory data analysis platform investigating potential correlations between Bitcoin market behavior and lunar cycles. For educational and curiosity purposes only.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/analytics" className="text-muted-foreground hover:text-white transition-colors text-sm">Analytics</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link href="/methodology" className="text-muted-foreground hover:text-white transition-colors text-sm">Methodology</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="https://github.com" className="text-muted-foreground hover:text-white transition-colors text-sm">GitHub</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-white transition-colors text-sm">Disclaimer</Link></li>
              <li><Link href="/api" className="text-muted-foreground hover:text-white transition-colors text-sm">API</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MoonBitcoin. Not financial advice.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
