import { fetchBitcoinData } from "../src/jobs/fetchBitcoin";
import { processMoonData } from "../src/jobs/fetchMoon";
import { processMetrics } from "../src/jobs/processMetrics";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🚀 Starting data seed...");
  
  try {
    // 1. Fetch Bitcoin data (last 365 days)
    await fetchBitcoinData(365);
    
    // 2. Process Moon data
    await processMoonData();
    
    // 3. Process Metrics
    await processMetrics();
    
    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
