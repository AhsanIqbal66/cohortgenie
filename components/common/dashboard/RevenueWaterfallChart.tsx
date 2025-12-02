import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function RevenueWaterfallChart({ rawData }: any) {
  let cumulative = 0;
  const chartData = rawData.map((item: any) => {
    const startValue = cumulative;
    cumulative += item.value;
    const endValue = cumulative;
    return {
      name: item.name,
      base: Math.min(startValue, endValue),
      barValue: Math.abs(item.value),
      value: item.value,
      total: endValue,
      color: item.color,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white text-primary-text px-4 py-3 rounded-lg shadow-lg">
          <p className="font-semibold mb-1 text-sm">{data?.name}</p>
          <p className="text-sm">
            {data.value >= 0 ? "+" : ""}$
            {data?.value !== undefined && data?.value !== null
              ? data.value.toLocaleString()
              : "N/A"}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => {
    if (value >= 0) return `$${value / 1000}k`;
    return `-$${Math.abs(value) / 1000}k`;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280" }}
            domain={[-3000, 9000]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fff" }} />
          <Bar
            dataKey="base"
            stackId="a"
            fill="transparent"
            isAnimationActive={false}
          />
          <Bar dataKey="barValue" stackId="a" radius={[6, 6, 6, 6]}>
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap items-center gap-3 lg:gap-4 2xl:gap-8 mt-4 justify-center">
        <LegendItem color="#A78BFA" label="Recurring" />
        <LegendItem color="#16A34A" label="Expansion" />
        <LegendItem color="#EF4444" label="Churned" />
      </div>
    </>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1 md:gap-1 xl:gap-2 text-primary-text">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs xl:text-sm">{label}</span>
    </div>
  );
}
