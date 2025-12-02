"use client";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobar",
  "November",
  "December",
];

export default function MonthList({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="w-40 bg-[#1d2127] p-3 rounded-xl">
      <h3 className="text-white text-sm mb-2">Months</h3>
      <div className="flex flex-col gap-1">
        {months.map((m, i) => (
          <button
            key={i}
            onClick={onSelect}
            className="px-3 py-2 text-left rounded hover:bg-[#2b3038] text-white"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
