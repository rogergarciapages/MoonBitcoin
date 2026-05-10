"use client";

import { TrendingUp, ArrowRight, Zap, Target, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getMoonData } from "@/lib/moon";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [moonData, setMoonData] = useState<{ moonPhase: string; moonIllumination: number } | null>(null);

  useEffect(() => {
    setMoonData(getMoonData(new Date()));
  }, []);

  const getCorrelationIndication = (phase: string) => {
    if (phase.includes("Waxing") || phase === "New Moon") {
      return { 
        label: "Bullish Bias", 
        subLabel: "Buy Accumulation", 
        color: "text-green-400", 
        bgColor: "bg-green-400/10",
        borderColor: "border-green-400/20",
        icon: <TrendingUp className="w-5 h-5 text-green-400" />
      };
    }
    if (phase.includes("Waning") || phase === "Full Moon") {
      return { 
        label: "Volatility Alert", 
        subLabel: "Sell/De-risk", 
        color: "text-red-400", 
        bgColor: "bg-red-400/10",
        borderColor: "border-red-400/20",
        icon: <AlertCircle className="w-5 h-5 text-red-400" />
      };
    }
    return { 
      label: "Neutral State", 
      subLabel: "Consolidation", 
      color: "text-bitcoin-gold", 
      bgColor: "bg-bitcoin-gold/10",
      borderColor: "border-bitcoin-gold/20",
      icon: <Zap className="w-5 h-5 text-bitcoin-gold" />
    };
  };

  const indication = moonData ? getCorrelationIndication(moonData.moonPhase) : null;

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
                href="/analytics" 
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
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative flex flex-col items-center justify-center overflow-visible">
              
              {/* Moon Visual Container - Large and transparent background */}
              <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mb-12">
                {/* Glow effects */}
                <div className="absolute inset-[-10%] rounded-full bg-bitcoin-gold/5 blur-[100px] pointer-events-none" />
                <div className="absolute inset-[-5%] rounded-full bg-white/5 blur-[80px] pointer-events-none animate-pulse" />
                
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_150px_rgba(255,255,255,0.05)] border border-white/10 bg-black">
                  <Image 
                    src="/images/moon.jpg" 
                    alt="Current Moon Phase" 
                    fill 
                    priority
                    className="object-cover scale-105"
                  />
                  {/* Advanced Moon Shader */}
                  <MoonShader illumination={moonData?.moonIllumination || 0} phase={moonData?.moonPhase || "New Moon"} />
                </div>
              </div>

              {/* Data Overlay */}
              {moonData && indication && (
                <div className="text-center w-full relative z-20">
                  <div className="flex flex-col items-center mb-8">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.4em] mb-3">Current Data Point</span>
                    <h3 className="text-5xl font-black text-white uppercase tracking-tight mb-3">{moonData.moonPhase}</h3>
                    <div className="px-4 py-1.5 rounded-full bg-bitcoin-gold/10 border border-bitcoin-gold/20 text-bitcoin-gold font-bold text-xs uppercase tracking-widest">
                      {moonData.moonIllumination.toFixed(1)}% Illumination
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center gap-5 px-10 py-5 rounded-2xl border ${indication.borderColor} ${indication.bgColor} backdrop-blur-3xl shadow-2xl`}>
                    <div className="p-3 rounded-xl bg-black/40">
                      {indication.icon}
                    </div>
                    <div className="text-left">
                      <div className={`text-lg font-black uppercase tracking-widest ${indication.color}`}>{indication.label}</div>
                      <div className="text-xs font-bold text-white/70 uppercase">{indication.subLabel}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoonShader({ illumination, phase }: { illumination: number; phase: string }) {
  // A truly curved moon shader using overlapping elements
  const isWaxing = phase.includes("Waxing") || phase === "New Moon" || phase === "First Quarter";
  const i = illumination / 100;
  
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 
        The "visible" part should have 0% opacity (show moon image).
        The "shaded" part should have 100% opacity (black).
      */}
      
      {/* 1. Base Shadow layer - only for the very edge or deep craters if needed, 
          but here we use it to represent the dark side. 
          Actually, we just use the terminator gradient.
      */}

      {/* 2. The Terminator Shader */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: getRealisticTerminator(illumination, isWaxing),
        }}
      />

      {/* 3. Rim Glow and Internal Shadow for 3D depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.95)]" />
    </div>
  );
}

function getRealisticTerminator(illumination: number, isWaxing: boolean) {
  // We need a sharp transition (100% opaque black to 100% transparent).
  const shadowColor = '#000000';
  const transparent = 'transparent';
  
  const i = illumination / 100;
  
  if (illumination >= 99) return transparent; // Full Moon
  if (illumination <= 1) return shadowColor; // New Moon

  // Standard Quarters (50%)
  if (illumination === 50) {
    return isWaxing 
      ? `linear-gradient(to right, ${shadowColor} 50%, ${transparent} 50%)` 
      : `linear-gradient(to left, ${shadowColor} 50%, ${transparent} 50%)`;
  }

  // Crescent (< 50%)
  // The shadow is a large ellipse that leaves a crescent sliver.
  if (illumination < 50) {
    const ellipseWidth = (1 - (i * 2)) * 100;
    // We want the shadow to cover the most of the moon.
    return isWaxing
      ? `radial-gradient(ellipse ${ellipseWidth}% 110% at ${100 - (i * 100)}% 50%, ${transparent} 49.5%, ${shadowColor} 50.5%)`
      : `radial-gradient(ellipse ${ellipseWidth}% 110% at ${i * 100}% 50%, ${transparent} 49.5%, ${shadowColor} 50.5%)`;
  } 
  
  // Gibbous (> 50%)
  // The shadow is a small ellipse covering the dark sliver.
  else {
    const ellipseWidth = ((i - 0.5) * 2) * 100;
    // We want the shadow to be just a sliver.
    return isWaxing
      ? `radial-gradient(ellipse ${100 - ellipseWidth}% 110% at 0% 50%, ${shadowColor} 49.5%, ${transparent} 50.5%)`
      : `radial-gradient(ellipse ${100 - ellipseWidth}% 110% at 100% 50%, ${shadowColor} 49.5%, ${transparent} 50.5%)`;
  }
}
