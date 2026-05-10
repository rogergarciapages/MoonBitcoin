"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface KpiGaugeProps {
  value: number; // 0 to 1 for normalized, or raw value
  max?: number;
  label?: string;
  unit?: string;
  color?: string;
}

export default function KpiGauge({ 
  value, 
  max = 100, 
  label, 
  unit = "%",
  color = "#FFC31C" 
}: KpiGaugeProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const COLORS = [color, "rgba(255, 255, 255, 0.05)"];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-[180px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={90}
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
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <span className="text-3xl font-black text-white leading-none">
            {value > 10 ? value.toFixed(0) : value.toFixed(2)}{unit}
          </span>
          {label && (
            <span className="text-[10px] font-bold text-bitcoin-gold uppercase tracking-[0.2em] mt-2 text-center px-4">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
