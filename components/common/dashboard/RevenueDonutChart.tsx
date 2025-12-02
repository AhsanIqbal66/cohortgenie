import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Expansion", value: 31 },
  { name: "Upsells", value: 19 },
  { name: "Recurring", value: 24 },
  { name: "Churned", value: 26 },
];

const COLORS = ["#4A3AFF", "#9B6EEE", "#C9B1F6", "#C6D2FD"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.62;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  if (percent * 100 < 5) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[13px] font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RevenueDonutChart = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width={260} height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={120}
              paddingAngle={0}
              cornerRadius={8}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => {
                const isPopped = index === 1;
                const popDistance = isPopped ? 13 : 0; // Adjust distance (px)
                const midAngle =
                  (360 *
                    (data.slice(0, index).reduce((a, b) => a + b.value, 0) +
                      entry.value / 2)) /
                  data.reduce((a, b) => a + b.value, 0);

                // Calculate offset position
                const xOffset =
                  popDistance * Math.cos((-midAngle * Math.PI) / 180);
                const yOffset =
                  popDistance * Math.sin((-midAngle * Math.PI) / 180);

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    transform={`translate(${xOffset}, ${yOffset})`}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-sm text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default RevenueDonutChart;
