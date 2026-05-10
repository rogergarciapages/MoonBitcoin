import { prisma } from "../lib/prisma";
import { format } from "date-fns";

export async function fetchBitcoinData(days: number = 1) {
  console.log(`Fetching Bitcoin data for the last ${days} days...`);
  
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    const { prices, market_caps, total_volumes } = data;
    
    // CoinGecko returns data in [timestamp, value] format
    // For daily data, we should group by day
    const dailyData: Record<string, any> = {};
    
    for (let i = 0; i < prices.length; i++) {
      const [timestamp, price] = prices[i];
      const dateKey = format(new Date(timestamp), "yyyy-MM-dd");
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: new Date(dateKey),
          priceUsd: price,
          marketCapUsd: market_caps[i]?.[1] || 0,
          volumeUsd: total_volumes[i]?.[1] || 0,
        };
      }
    }
    
    console.log(`Processed ${Object.keys(dailyData).length} days of data.`);
    
    for (const dateKey in dailyData) {
      const record = dailyData[dateKey];
      
      await prisma.dailyMarketData.upsert({
        where: { date: record.date },
        update: {
          priceUsd: record.priceUsd,
          marketCapUsd: record.marketCapUsd,
          volumeUsd: record.volumeUsd,
        },
        create: record,
      });
    }
    
    console.log("Bitcoin data successfully stored in database.");
  } catch (error) {
    console.error("Error fetching Bitcoin data:", error);
  }
}
