"use client";

import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export default function VolumeHeatmap({ data }: { data: any[] }) {
  const plotData = data.map(d => ({
    illumination: Math.round(d.moonIllumination),
    volume: d.volumeUsd / 1000000000, // In Billions for better scale
    price: d.priceUsd
  })).filter(d => d.volume > 0);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            type="number" 
            dataKey="illumination" 
            name="Illumination" 
            unit="%" 
            stroke="#474747"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="volume" 
            name="Volume" 
            unit="B" 
            stroke="#474747"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis type="number" dataKey="price" range={[50, 400]} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ 
              backgroundColor: "#242424", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#fff"
            }}
          />
          <Scatter name="Market Activity" data={plotData} fill="#FFC31C">
            {plotData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill="#FFC31C" 
                opacity={entry.illumination > 80 ? 0.8 : 0.3} 
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
