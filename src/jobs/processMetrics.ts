import { prisma } from "../lib/prisma";

export async function processMetrics() {
  console.log("Calculating metrics (returns and volatility)...");
  
  try {
    const allRecords = await prisma.dailyMarketData.findMany({
      orderBy: { date: "asc" }
    });
    
    for (let i = 1; i < allRecords.length; i++) {
      const current = allRecords[i];
      const previous = allRecords[i-1];
      
      if (current.priceUsd && previous.priceUsd) {
        const dailyReturn = ((current.priceUsd - previous.priceUsd) / previous.priceUsd) * 100;
        
        // Simple volatility: absolute return for now
        // A better one would be standard deviation over a window, but let's keep it simple
        const volatility = Math.abs(dailyReturn);
        
        await prisma.dailyMarketData.update({
          where: { id: current.id },
          data: {
            dailyReturn,
            volatility,
          }
        });
      }
    }
    
    console.log("Metrics successfully calculated.");
  } catch (error) {
    console.error("Error processing metrics:", error);
  }
}
