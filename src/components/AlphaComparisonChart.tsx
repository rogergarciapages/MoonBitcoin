"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { format } from "date-fns";

export default function AlphaComparisonChart({ data }: { data: any[] }) {
  // Calculate cumulative returns for Buy & Hold vs Lunar Strategy
  // Lunar Strategy: Long during Waxing (New -> Full), Flat during Waning (Full -> New)
  let buyAndHold = 100;
  let lunarStrategy = 100;
  
  const chartData = data.map((d, i) => {
    if (i > 0) {
      const dailyReturn = d.dailyReturn || 0;
      buyAndHold = buyAndHold * (1 + dailyReturn / 100);
      
      // Strategy: Only be in the market if it's Waxing phases
      const isWaxing = d.moonPhase?.includes("Waxing") || d.moonPhase === "New Moon" || d.moonPhase === "First Quarter";
      if (isWaxing) {
        lunarStrategy = lunarStrategy * (1 + dailyReturn / 100);
      }
    }
    
    return {
      date: d.date,
      "Buy & Hold": parseFloat(buyAndHold.toFixed(2)),
      "Lunar Strategy": parseFloat(lunarStrategy.toFixed(2)),
    };
  });

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => format(new Date(str), "MMM yyyy")}
            stroke="#474747"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#474747"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#242424", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff"
            }}
            labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
          />
          <Legend verticalAlign="top" height={36}/>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <Line 
            type="monotone" 
            dataKey="Buy & Hold" 
            stroke="#474747" 
            strokeWidth={2}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="Lunar Strategy" 
            stroke="#FFC31C" 
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
