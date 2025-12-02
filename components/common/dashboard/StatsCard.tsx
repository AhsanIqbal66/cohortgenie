"use client";
import { useState, useEffect } from "react";

const StatsCard = ({
  stat,
  index,
  statsData,
  statsDataRes,
  customers,
  loading,
}: any) => {
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLast = index === statsData.length - 1;

  return (
    <div
      className={`
        flex-1 min-w-[220px] 
        flex items-start justify-between p-[22px] group
        border-[#E5E7EB]

        ${!isMobile && !isLast ? "lg:border-r" : ""} 
        ${isMobile && !isLast ? "border-b" : ""}
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-col gap-y-1">
        <div className="w-10 h-10 flex items-center rounded-full justify-center bg-transparent group-hover:bg-[#9B6EEE]/10 mb-3 transition-all">
          {hover ? (
            <stat.fillIcon color={"#9B6EEE"} />
          ) : (
            <stat.icon color={"#6B7280"} />
          )}
        </div>

        <span className="text-secondary-text text-sm font-medium">
          {stat.title}
        </span>

        <div className="text-[28px] font-bold text-primary-text group-hover:text-[#9B6EEE] transition-all">
          {loading ? "-" : index === 0 && statsDataRes?.GDR}
          {loading ? "-" : index === 1 && statsDataRes?.NDR}
          {loading ? "-" : index === 2 && statsDataRes?.LTV}
          {loading ? "-" : index === 3 && customers}
        </div>

        <span className="text-secondary-text text-sm">
          {loading
            ? "-"
            : index === 3
              ? `Churn Rate: ${statsDataRes?.churn}`
              : stat.label}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
