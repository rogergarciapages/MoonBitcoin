"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export default function VolatilityBoxPlot({ data }: { data: any[] }) {
  // Data arrives as daily records. We need to group by phase and get min, max, avg volatility.
  const phases = [
    "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
  ];

  const plotData = phases.map(phase => {
    const phaseData = data.filter(d => d.moonPhase === phase);
    const volatilities = phaseData.map(d => d.volatility || 0).sort((a, b) => a - b);
    
    if (volatilities.length === 0) return null;

    return {
      phase,
      min: volatilities[0].toFixed(2),
      max: volatilities[volatilities.length - 1].toFixed(2),
      avg: (volatilities.reduce((a, b) => a + b, 0) / volatilities.length).toFixed(2),
      // We'll use these for the "box"
      low: volatilities[Math.floor(volatilities.length * 0.25)].toFixed(2),
      high: volatilities[Math.floor(volatilities.length * 0.75)].toFixed(2),
    };
  }).filter(Boolean);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={plotData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="phase" 
            angle={-45} 
            textAnchor="end" 
            interval={0}
            stroke="#474747"
            fontSize={10}
            tickLine={false}
          />
          <YAxis 
            stroke="#474747"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Volatility %', angle: -90, position: 'insideLeft', fill: '#474747', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#242424", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff"
            }}
          />
          <Bar dataKey="avg" fill="#FFC31C" radius={[4, 4, 0, 0]}>
            {plotData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={parseFloat(entry?.avg || "0") > 3 ? "#FFC31C" : "#474747"} opacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
