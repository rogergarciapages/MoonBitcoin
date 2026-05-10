"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CorrelationGaugeProps {
  value: number; // 0 to 1
  label?: string;
}

export default function CorrelationGauge({ value, label = "Correlation Index" }: CorrelationGaugeProps) {
  const percentage = value * 100;
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const COLORS = ["#FFC31C", "rgba(255, 255, 255, 0.05)"];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[240px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Value Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <span className="text-5xl font-black text-white leading-none">{(value * 100).toFixed(0)}%</span>
          <span className="text-xs font-bold text-bitcoin-gold uppercase tracking-[0.2em] mt-2">{label}</span>
        </div>
      </div>
      
      <div className="flex justify-between w-full max-w-[240px] mt-2 px-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">No Correlation</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Full Correlation</span>
      </div>
    </div>
  );
}
