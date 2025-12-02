"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_TICK_STYLE = { fontSize: 14 };
const SMALL_TICK_STYLE = { fontSize: 12 };

export default function CustomerRetentionChart({ data, loading }: any) {
  const [tickStyle, setTickStyle] = useState(DEFAULT_TICK_STYLE);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setTickStyle(SMALL_TICK_STYLE);
      } else {
        setTickStyle(DEFAULT_TICK_STYLE);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className="h-[300px] w-full" />
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              
              <XAxis 
                dataKey="period" 
                axisLine={false} 
                tickLine={false} 
                tick={tickStyle} 
              />
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                tick={tickStyle}
              />
              
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "8px",
                  background: "white",
                  border: "1px solid #eee",
                  color: "#9B6EEE",
                }}
                formatter={(value: number) => [`Retention : $${value}`]}
              />
              <Bar dataKey="netRevenue" fill="#C9B1F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}