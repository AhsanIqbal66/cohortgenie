import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Color palette for lines
const COLORS = [
  "#00B5D4",
  "#2F80ED",
  "#9B51E0",
  "#F2994A",
  "#27AE60",
  "#EB5757",
  "#F2C94C",
  "#56CCF2",
  "#BB6BD9",
  "#6FCF97",
  "#219653",
  "#2D9CDB",
];

const CohortRetentionLineChart = ({ data, loading }: any) => {
  // Return early if no data
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        No data available
      </div>
    );
  }

  // Extract all unique keys (excluding 'month', 'quarter', 'year')
  const uniqueKeys = useMemo(() => {
    const keys = new Set<string>();
    data.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (!["month", "quarter", "year"].includes(key)) {
          keys.add(key);
        }
      });
    });
    return Array.from(keys);
  }, [data]);

  // Determine x-axis dataKey
  const xAxisKey = data[0]?.month
    ? "month"
    : data[0]?.quarter
      ? "quarter"
      : "year";

  // Build legend items
  const legendItems = uniqueKeys.map((key, idx) => ({
    label: key,
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <div>
      {loading ? (
        <Skeleton className="h-[400px]" />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis axisLine={false} tickLine={false} dataKey={xAxisKey} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                }}
                cursor={{
                  stroke: "#9B6EEE",
                  strokeWidth: 2,
                  strokeDasharray: "4 4",
                }}
              />
              {uniqueKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[idx % COLORS.length]}
                  strokeWidth={2}
                  strokeDasharray="12 5"
                  dot={{
                    r: 5,
                    fill: COLORS[idx % COLORS.length],
                    stroke: "none",
                  }}
                  activeDot={{ stroke: "none" }}
                  connectNulls={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-6">
            {legendItems.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-md"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm sm:text-base font-medium text-gray-700 select-none">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CohortRetentionLineChart;
