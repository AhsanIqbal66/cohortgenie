"use client";

const years = [2021, 2022, 2023, 2024, 2025];

export default function YearList({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="w-28 bg-[#1d2127] p-3 rounded-xl">
      <h3 className="text-white text-sm mb-2">Years</h3>
      <div className="flex flex-col gap-1 overflow-y-auto max-h-48">
        {years.map((y, i) => (
          <button
            key={i}
            onClick={onSelect}
            className="px-3 py-2 rounded text-left hover:bg-[#2b3038] text-white"
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}
