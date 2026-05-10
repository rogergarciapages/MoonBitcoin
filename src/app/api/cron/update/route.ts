import { NextResponse } from "next/server";
import { fetchBitcoinData } from "@/jobs/fetchBitcoin";
import { processMoonData } from "@/jobs/fetchMoon";
import { processMetrics } from "@/jobs/processMetrics";

/**
 * API Route to trigger the daily data update.
 * Can be called by a CRON job service.
 */
export async function GET(request: Request) {
  // Simple security check using an API Key in headers
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log("🚀 Starting daily data update...");

  try {
    // 1. Fetch Bitcoin data for the last 3 days (to ensure no gaps)
    await fetchBitcoinData(3);
    
    // 2. Process Moon data for missing records
    await processMoonData();
    
    // 3. Re-calculate metrics to include new records
    await processMetrics();
    
    return NextResponse.json({ 
      success: true, 
      message: "Daily data update completed successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("❌ Daily update failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
