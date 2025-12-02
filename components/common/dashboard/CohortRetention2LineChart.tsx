"use client";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CohortRetention2LineChart = ({
  data,
  period1Label,
  period2Label,
  isLoading,
}: any) => {
  console.log("🚀 ~ CohortRetention2LineChart ~ data:", data);
  const cleanChartData = data?.map((item: any) => ({
    month: item.month,
    period1:
      typeof item.period1 === "string"
        ? parseFloat(item.period1.replace("%", ""))
        : item.period1,

    period2:
      typeof item.period2 === "string"
        ? parseFloat(item.period2.replace("%", ""))
        : item.period2,
  }));
  return (
    <>
      {!data ? (
        <div className="h-[300px] flex items-center justify-center">
          <h2 className="text-xl">
            Choose periods and filter types to view analytics on the chart.
          </h2>
        </div>
      ) : (
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">
            GDR Comparison ( {period1Label + " vs " + period2Label})
          </h2>
          {isLoading ? (
            <Skeleton className="h-[350px]" />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={cleanChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />

                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />

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

                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />

                {/* PERIOD 1 */}

                <Line
                  type="monotone"
                  dataKey="period1"
                  name={period1Label} // e.g., "Jan 2024"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "#8B5CF6",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="period2"
                  name={period2Label} // e.g., "Jan 2025"
                  stroke="#22D3EE"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "#22D3EE",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      )}
    </>
  );
};

export default CohortRetention2LineChart;
