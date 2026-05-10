import { PrismaClient } from "@prisma/client";
import { addDays, subYears, format } from "date-fns";

const prisma = new PrismaClient();

// Realistic moon phase logic
function getMoonPhase(date: Date) {
  const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  const cycle = 29.53;
  const knownNewMoon = new Date("2024-01-11");
  const diffDays = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const age = ((diffDays % cycle) + cycle) % cycle;
  const phaseIndex = Math.floor((age / cycle) * 8);
  return {
    phase: phases[phaseIndex],
    illumination: Math.abs(50 - (age / cycle) * 100) * 2
  };
}

async function seed() {
  console.log("Seeding 10 years of Bitcoin + Moon data...");
  
  await prisma.dailyMarketData.deleteMany();
  
  const startDate = subYears(new Date(), 10);
  const totalDays = 365 * 10;
  
  let currentPrice = 400;
  
  const data = [];
  
  for (let i = 0; i < totalDays; i++) {
    const date = addDays(startDate, i);
    
    // Simulate some volatility and growth
    const volatility = 2 + Math.random() * 5;
    const dailyReturn = (Math.random() - 0.48) * volatility; // Slight upward bias
    currentPrice *= (1 + dailyReturn / 100);
    
    const moon = getMoonPhase(date);
    
    data.push({
      date,
      priceUsd: currentPrice,
      volumeUsd: 1000000000 + Math.random() * 50000000000,
      marketCapUsd: currentPrice * 19000000,
      moonPhase: moon.phase,
      moonIllumination: moon.illumination,
      dailyReturn,
      volatility
    });
    
    // Batch insert every 500 days
    if (data.length === 500 || i === totalDays - 1) {
      await prisma.dailyMarketData.createMany({ data });
      data.length = 0;
      console.log(`Inserted ${i + 1}/${totalDays} days...`);
    }
  }
  
  console.log("✅ Seeding complete!");
}

seed().catch(console.error).finally(() => prisma.$disconnect());
