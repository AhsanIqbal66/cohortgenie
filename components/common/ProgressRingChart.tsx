import React, { useMemo } from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const ProgressRingChart = ({ value, color }: any) => {
  const data = useMemo(
    () => [
      {
        name: "Progress",
        uv: value,
        fill: "#14FAF7",
      },
    ],
    [value, color]
  );
  return (
    <div className="w-20 h-20 flex items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          barSize={6}
          data={data}
          startAngle={90}
          endAngle={90 + (360 * value) / 100}
        >
          <RadialBar
            dataKey="uv"
            cornerRadius={5}
            fill="#7388A9"
            isAnimationActive={false}
            background={{ fill: "#14FAF7" }}
            max={100}
          />
          <RadialBar
            dataKey="uv"
            cornerRadius={5}
            fill={color}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
        {value}%
      </div>
    </div>
  );
};

export default ProgressRingChart;
