"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import MonthList from "./MonthList";
import YearList from "./YearList";

export default function DateFilter({
  onApply,
}: {
  onApply: (filters: any) => void;
}) {
  const [type, setType] = useState("month");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleApply = () => {
    onApply({
      type,
      period1: startDate ? startDate.toISOString().split("T")[0] : null,
      period2: endDate ? endDate.toISOString().split("T")[0] : null,
    });
  };

  return (
    <div className="flex gap-6 bg-[#0e1117] text-white p-6 rounded-xl">
      {/* Date Picker UI */}
      <div className="bg-white text-black p-5 rounded-xl shadow-lg w-[480px]">
        <div className="text-sm font-medium mb-2">Date Picker</div>

        <div className="flex gap-6">
          {/* Start Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
            />
          </div>

          {/* End Calendar */}
          <div>
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
          </div>
        </div>

     
      </div>

      {/* Month & Year Filter */}
      <div className="flex gap-4">
        <MonthList onSelect={() => setType("month")} />
        <YearList onSelect={() => setType("year")} />
      </div>
    </div>
  );
}
