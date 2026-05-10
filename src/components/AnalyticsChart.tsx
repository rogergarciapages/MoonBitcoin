"use client";

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ReferenceDot
} from "recharts";
import { format } from "date-fns";

export default function AnalyticsChart({ data }: { data: any[] }) {
  // Find moon phase points for overlay
  const fullMoonPoints = data.filter(d => d.moonPhase === "Full Moon");
  const newMoonPoints = data.filter(d => d.moonPhase === "New Moon");

  return (
    <div className="w-full h-[400px] md:h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC31C" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#FFC31C" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tickFormatter={(str) => format(new Date(str), "MMM d")}
            stroke="#474747"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            hide={true}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#242424", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff"
            }}
            labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Price"]}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <Area 
            type="monotone" 
            dataKey="priceUsd" 
            stroke="#FFC31C" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
            animationDuration={1500}
          />
          
          {/* Moon Overlays */}
          {fullMoonPoints.map((p, i) => (
            <ReferenceDot 
              key={`full-${i}`}
              x={p.date} 
              y={p.priceUsd} 
              r={6} 
              fill="#fff" 
              stroke="#FFC31C" 
              strokeWidth={2}
            />
          ))}
          
          {newMoonPoints.map((p, i) => (
            <ReferenceDot 
              key={`new-${i}`}
              x={p.date} 
              y={p.priceUsd} 
              r={6} 
              fill="#000" 
              stroke="#FFC31C" 
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
