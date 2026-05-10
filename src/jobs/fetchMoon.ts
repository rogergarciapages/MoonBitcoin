import { prisma } from "../lib/prisma";
import { getMoonData } from "../lib/moon";

export async function processMoonData() {
  console.log("Processing moon data for all records...");
  
  try {
    const records = await prisma.dailyMarketData.findMany({
      where: {
        OR: [
          { moonPhase: null },
          { moonIllumination: null }
        ]
      }
    });
    
    console.log(`Found ${records.length} records needing moon data.`);
    
    for (const record of records) {
      const moonData = getMoonData(new Date(record.date));
      
      await prisma.dailyMarketData.update({
        where: { id: record.id },
        data: {
          moonPhase: moonData.moonPhase,
          moonIllumination: moonData.moonIllumination,
        }
      });
    }
    
    console.log("Moon data successfully updated in database.");
  } catch (error) {
    console.error("Error processing moon data:", error);
  }
}
