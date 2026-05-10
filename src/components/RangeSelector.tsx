"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ranges = [
  { label: "Last Moon", value: "30D" },
  { label: "1 Year", value: "1Y" },
  { label: "5 Years", value: "5Y" },
  { label: "All Time", value: "ALL" },
];

export default function RangeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRange = searchParams.get("range") || "1Y";

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleRangeChange(range.value)}
          className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
            currentRange === range.value
              ? "bg-bitcoin-gold text-black shadow-lg"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
