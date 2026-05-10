import Link from "next/link";
import { Moon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-bitcoin-gold rounded-lg group-hover:brightness-110 transition-all">
                <Moon className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Moon<span className="text-bitcoin-gold">Bitcoin</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/analytics" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/blog" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="https://github.com/rogergarciapages/MoonBitcoin" target="_blank" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors">
              Give project a Star on GitHub
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/analytics" 
              className="px-5 py-2 bg-bitcoin-gold text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
            >
              Explore Data
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
