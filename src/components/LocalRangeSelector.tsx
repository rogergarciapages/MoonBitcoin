"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LocalRangeSelectorProps {
  paramName: string;
  current: string;
}

const ranges = [
  { label: "1Y", value: "1Y" },
  { label: "5Y", value: "5Y" },
  { label: "ALL", value: "ALL" },
];

export default function LocalRangeSelector({ paramName, current }: LocalRangeSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => handleRangeChange(range.value)}
          className={`px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded transition-all ${
            current === range.value
              ? "bg-bitcoin-gold text-black shadow-sm"
              : "text-muted-foreground hover:text-white hover:bg-white/5"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
