"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  Chart1,
  Chart2,
  MontCHartdata,
  retentionData,
  typeToggleItems,
  yearsWIthoutAll,
} from "@/constants";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MonthlyCohortTable from "@/components/common/MonthlyCohortTable";
import YearlyCohortTable from "@/components/common/dashboard/YearlyCohortTable";
import QuartlyCohortTable from "@/components/common/dashboard/QuartlyCohortTable";
import { useGetDashboard } from "@/hooks/ReactQueryHooks/dashboard";
import MetricCard from "@/components/common/MetricCard";
import ProgressRingChart from "@/components/common/ProgressRingChart";
import CohortRetentionLineChart from "@/components/common/dashboard/CohortRetentionLineChart";
import {
  getMatrixStatsWithLabels,
  processMatrix,
} from "@/lib/utils/getMatrixStats";
import Error403 from "@/components/common/Error403";

const ToggleGroup = ({ type, onValueChange, items }: any) => (
  <div className="flex bg-white py-1 px-2 rounded-lg border border-[#E5E7EB]">
    {items.map((item: any) => (
      <button
        key={item.value}
        onClick={() => onValueChange(item.value)}
        className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
          type === item.value
            ? "bg-[#9B6EEE] text-white"
            : "text-secondary-text hover:bg-gray-100"
        }`}
      >
        {item.label}
      </button>
    ))}
  </div>
);
// const legendItems = [
//   { label: "Jan 2025", color: "bg-teal-400" },
//   { label: "Mar 2025", color: "bg-blue-500" },
//   { label: "Feb 2025", color: "bg-violet-500" },
// ];
const page = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedType, setSelectedType] = useState("month");
  const [chartType, setChartType] = useState("top");
  const [cohortPerformanceValues, setCohortPerformanceValues] = useState<any>();
  console.log("🚀 ~ page ~ cohortPerformanceValues:", cohortPerformanceValues);
  const [filters, setFilters] = useState({
    selectedYear: "2025",
    selectedType: "month",
  });
  const [chartValues, setChartValues] = useState<any>();
  const {
    data: dashboardData,
    refetch,
    isLoading: loading,
    isError,
  } = useGetDashboard(filters);

  useEffect(() => {
    setFilters({
      selectedYear,
      selectedType,
    });
  }, [selectedYear, selectedType]);
  useEffect(() => {
    if (!dashboardData) {
      setChartValues([]);
      setCohortPerformanceValues(null);
      return;
    }
    let result = null;
    let result2 = null;
    if (selectedType === "month") {
      result = getMatrixStatsWithLabels(
        dashboardData.data.cohortGenie.heatmap.month.monthMatrix,
        dashboardData.data.cohortGenie.heatmap.month.monthLabels
      );
    } else if (selectedType === "quarter") {
      result = getMatrixStatsWithLabels(
        dashboardData.data.cohortGenie.heatmap.quarter.quarterMatrix,
        dashboardData.data.cohortGenie.heatmap.quarter.quarterLabels
      );
    } else if (selectedType === "year") {
      result = getMatrixStatsWithLabels(
        dashboardData.data.cohortGenie.heatmap.year.yearMatrix,
        dashboardData.data.cohortGenie.heatmap.year.years
      );
    }

    setCohortPerformanceValues(result);

    if (selectedType === "month") {
      result2 = processMatrix(
        dashboardData.data.cohortGenie.heatmap.month.monthMatrix,
        selectedType,
        chartType,
        "3"
      );
    }

    if (selectedType === "quarter") {
      result2 = processMatrix(
        dashboardData.data.cohortGenie.heatmap.quarter.quarterMatrix,
        selectedType,
        chartType,
        "1"
      );
    }

    if (selectedType === "year") {
      result2 = processMatrix(
        dashboardData.data.cohortGenie.heatmap.year.yearMatrix,
        selectedType,
        chartType,
        "1"
      );
    }

    setChartValues(result2);
  }, [dashboardData, selectedType, chartType]);

  return (
    <div className="space-y-6">
      {isError ? (
        <Error403 />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary-text text-[22px] font-semibold">
                Retention Heatmap
              </h1>
              <p className="text-secondary-text text-sm">
                Visualize how your customer cohorts retain over time
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-[120px]">
                  <Download />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"csv"}>CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Card>
            <CardContent>
              <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between mb-6">
                <h6 className="text-primary-text font-medium text-lg">
                  Cohort Retention Analysis
                </h6>
                <div className="flex flex-wrap sm:flex-nowrap gap-y-2 gap-x-3">
                  <ToggleGroup
                    type={selectedType}
                    onValueChange={setSelectedType}
                    items={typeToggleItems}
                  />
                  {selectedType && selectedType !== "year" && (
                    <Select
                      value={selectedYear}
                      onValueChange={(year) => {
                        setSelectedYear(year);
                      }}
                    >
                      <SelectTrigger className="w-[150px] text-secondary-text">
                        <SelectValue
                          placeholder="Select Year"
                          className="text-secondary-text"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {yearsWIthoutAll.map((year) => (
                          <SelectItem
                            key={year}
                            value={year}
                            className="text-secondary-text"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              {selectedType === "month" && (
                <MonthlyCohortTable
                  loading={loading}
                  matrix={
                    dashboardData?.data?.cohortGenie?.heatmap?.month
                      ?.monthMatrix
                  }
                  labels={
                    dashboardData?.data?.cohortGenie?.heatmap?.month
                      ?.monthLabels
                  }
                />
              )}
              {selectedType === "quarter" && (
                <QuartlyCohortTable
                  loading={loading}
                  matrix={
                    dashboardData?.data?.cohortGenie?.heatmap?.quarter
                      ?.quarterMatrix
                  }
                  labels={
                    dashboardData?.data?.cohortGenie?.heatmap?.quarter
                      ?.quarterLabels
                  }
                />
              )}
              {selectedType === "year" && (
                <YearlyCohortTable
                  loading={loading}
                  matrix={
                    dashboardData?.data?.cohortGenie?.heatmap?.year?.yearMatrix
                  }
                  labels={
                    dashboardData?.data?.cohortGenie?.heatmap?.year?.years
                  }
                />
              )}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <MetricCard
              icon={retentionData.highest.icon}
              secondaryText={
                selectedYear === "year"
                  ? `Highest: ${cohortPerformanceValues?.highestLabel}`
                  : `Highest: ${cohortPerformanceValues?.highestLabel} ${selectedYear}`
              }
              primaryText={`${cohortPerformanceValues?.highestValue}% Retention`}
              chartComponent={<Chart1 />}
              loading={loading}
            />
            <MetricCard
              icon={retentionData.lowest.icon}
              secondaryText={`Lowest: ${cohortPerformanceValues?.lowestLabel} ${selectedYear}`}
              primaryText={`${cohortPerformanceValues?.lowestValue}% Retention`}
              chartComponent={<Chart2 />}
              loading={loading}
            />
            <MetricCard
              icon={retentionData.average.icon}
              secondaryText={`Overall average: `}
              primaryText={`${cohortPerformanceValues?.averageValue}%`}
              chartComponent={
                <ProgressRingChart
                  value={cohortPerformanceValues?.averageValue}
                />
              }
              loading={loading}
            />
          </div>
          <Card>
            <CardContent>
              <div className="flex flex-wrap gap-y-2 items-center justify-between mb-10">
                <h2 className="font-medium text-lg text-primary-text">
                  Cohort Retention Curves
                </h2>
                <Select
                  value={chartType}
                  onValueChange={(type: any) => {
                    setChartType(type);
                  }}
                >
                  <SelectTrigger className="w-[150px] text-secondary-text">
                    <SelectValue
                      placeholder="Select Value"
                      className="text-secondary-text"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedType === "month" ? (
                      <>
                        <SelectItem
                          value={"all"}
                          className="text-secondary-text"
                        >
                          All
                        </SelectItem>
                        <SelectItem
                          value={"top"}
                          className="text-secondary-text"
                        >
                          Top 3
                        </SelectItem>
                        <SelectItem
                          value={"bottom"}
                          className="text-secondary-text"
                        >
                          Bottom 3
                        </SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem
                          value={"all"}
                          className="text-secondary-text"
                        >
                          All
                        </SelectItem>
                        <SelectItem
                          value={"top"}
                          className="text-secondary-text"
                        >
                          Top
                        </SelectItem>
                        <SelectItem
                          value={"bottom"}
                          className="text-secondary-text"
                        >
                          Bottom
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <CohortRetentionLineChart data={chartValues} loading={loading} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default page;
