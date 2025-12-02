"use client";
import CohortRetention2LineChart from "@/components/common/dashboard/CohortRetention2LineChart";
import MetricsComparisonTable from "@/components/common/MetricsComparisonTable";
import { Card, CardContent } from "@/components/ui/card";
import {
  chartData2lines,
  MetricsComparisonTableData,
  months,
  quarters,
  yearsOnly,
} from "@/constants";
import {
  Chart1,
  Chart2,
  MontCHartdata,
  retentionData,
  typeToggleItems,
  yearsWIthoutAll,
} from "@/constants";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FiltersSheet from "@/components/common/FiltersSheet";
import { SlidersHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { useGetComparison } from "@/hooks/ReactQueryHooks/comparison";
import Error404 from "@/components/common/Error404";
import Error403 from "@/components/common/Error403";
import MetricCard from "@/components/common/MetricCard";
import ProgressRingChart from "@/components/common/ProgressRingChart";
const getPeriodLabel = (periodString: any, type: any) => {
  // Agar year type hai ya periodString mein "-" nahi hai
  if (type === "year" || !periodString?.includes("-")) {
    return periodString; // Direct year return karo (e.g., "2025")
  }

  const [value, year] = periodString.split("-");

  if (type === "month") {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = parseInt(value) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  }

  if (type === "quarter") {
    return `Q${value} ${year}`;
  }

  return periodString;
};

const getFullPeriodLabel = (periodString: any, type: any) => {
  // Agar year type hai ya periodString mein "-" nahi hai
  if (type === "year" || !periodString?.includes("-")) {
    return periodString; // Direct year return karo (e.g., "2025")
  }

  const [value, year] = periodString.split("-");

  if (type === "month") {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = parseInt(value) - 1;
    return `${monthNames[monthIndex]} ${year}`;
  }

  if (type === "quarter") {
    return `Quarter ${value} ${year}`;
  }

  return periodString;
};
const page = () => {
  // const formatDate = (date?: Date) => {
  //   if (!date) return null;
  //   return `${date.getMonth() + 1}-${date.getFullYear()}`;
  // };
  const [cohortPerformanceValues, setCohortPerformanceValues] = useState<any>();
  console.log("🚀 ~ page ~ cohortPerformanceValues:", cohortPerformanceValues);
  const [payload, setPayload] = useState<any>({});
  console.log("🚀 ~ page ~ payload:", payload);
  const [chartData, setChartData] = useState([]);
  const [metricsComparisonTable, setMetricsComparisonTable] =
    useState<any>(null);
  const [period1Label, setPeriod1Label] = useState("Period 1");
  const [period2Label, setPeriod2Label] = useState("Period 2");
  const [tablePeriod1Label, setTablePeriod1Label] = useState("Period 1");
  const [tablePeriod2Label, setTablePeriod2Label] = useState("Period 2");
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState("year");

  const [staticYears, setStaticYears] = useState(yearsOnly);
  const [staticQuarters, setStaticQuarters] = useState(quarters);
  const [staticMonths, setStaticMonths] = useState(months);

  const [staticYears2, setStaticYears2] = useState(yearsOnly);
  const [staticQuarters2, setStaticQuarters2] = useState(quarters);
  const [staticMonths2, setStaticMonths2] = useState(months);

  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");

  // PERIOD 2
  const [selectedYear2, setSelectedYear2] = useState("");
  const [selectedMonth2, setSelectedMonth2] = useState("");
  const [selectedQuarter2, setSelectedQuarter2] = useState("");

  useEffect(() => {
    if (filterType === "year" && selectedYear) {
      setStaticYears2(yearsOnly.filter((y) => y !== selectedYear));
    }
  }, [selectedYear, filterType]);

  useEffect(() => {
    if (filterType === "month" && selectedMonth) {
      if (selectedYear === selectedYear2) {
        setStaticMonths2(months.filter((m) => m.id !== selectedMonth));
      } else {
        setStaticMonths2(months);
      }
    }
  }, [selectedMonth, selectedYear, selectedYear2, filterType]);

  useEffect(() => {
    if (filterType === "quarter" && selectedQuarter) {
      if (selectedYear === selectedYear2) {
        setStaticQuarters2(quarters.filter((q) => q.id !== selectedQuarter));
      } else {
        setStaticQuarters2(quarters);
      }
    }
  }, [selectedQuarter, selectedYear, selectedYear2, filterType]);
  useEffect(() => {
    if (filterType === "month") {
      if (selectedYear === selectedYear2 && selectedMonth) {
        setStaticMonths2(months.filter((m) => m.id !== selectedMonth));
      } else {
        setStaticMonths2(months);
      }
    }
    if (filterType === "quarter") {
      if (selectedYear === selectedYear2 && selectedQuarter) {
        setStaticQuarters2(quarters.filter((q) => q.id !== selectedQuarter));
      } else {
        setStaticQuarters2(quarters);
      }
    }
  }, [selectedYear2, filterType]);

  useEffect(() => {
    setSelectedMonth("");
    setSelectedMonth2("");
    setSelectedQuarter("");
    setSelectedQuarter2("");
    setSelectedYear2("");
    setStaticMonths(months);
    setStaticQuarters(quarters);
    setStaticYears(yearsOnly);
    setStaticMonths2(months);
    setStaticQuarters2(quarters);
    setStaticYears2(yearsOnly);
  }, [filterType]);

  const handleSubmit = () => {
    let period1 = "";
    let period2 = "";
    let type = filterType;

    if (type === "month") {
      if (
        !selectedMonth ||
        !selectedYear ||
        !selectedMonth2 ||
        !selectedYear2
      ) {
        toast.error("All Filter Values are Required");
        return null;
      }
      period1 = `${selectedMonth}-${selectedYear}`;
      period2 = `${selectedMonth2}-${selectedYear2}`;
    }

    if (type === "quarter") {
      if (
        !selectedQuarter ||
        !selectedYear ||
        !selectedQuarter2 ||
        !selectedYear2
      ) {
        toast.error("All Filter Values are Required", {});
        return null;
      }
      period1 = `${selectedQuarter}-${selectedYear}`;
      period2 = `${selectedQuarter2}-${selectedYear2}`;
    }

    if (type === "year") {
      if (!selectedYear || !selectedYear2) {
        toast.error("All Filter Values are Required", {});
        return null;
      }
      period1 = selectedYear;
      period2 = selectedYear2;
    }

    setPayload({
      type,
      period1,
      period2,
    });
    setOpen(false);
  };
  const { data, refetch, isError, isLoading } = useGetComparison({
    filter: payload,
  });
  const transformMetricsData = (metricsData: any) => {
    console.log("🚀 ~ transformMetricsData ~ metricsData:", metricsData);
    if (!metricsData) return [];
    const p1 = metricsData?.metrics?.period1;
    const p2 = metricsData?.metrics?.period2;
    const diff = metricsData?.difference;
    return [
      {
        metric: "Gross Dollar Retention",
        current: p1.GDR,
        previous: p2.GDR,
        change: parseFloat(diff.GDR),
        isCurrency: false,
      },
      {
        metric: "Net Dollar Retention",
        current: p1.NDR,
        previous: p2.NDR,
        change: parseFloat(diff.NDR),
        isCurrency: false,
      },
      {
        metric: "Customer LTV",
        current: p1.LTV,
        previous: p2.LTV,
        change: Number(diff.LTV),
        isCurrency: true,
      },
      {
        metric: "Churn Rate",
        current: `${p1.churn}`,
        previous: `${p2.churn}`,
        change: Number(diff.churn),
        isCurrency: false,
      },
      {
        metric: "Net Revenue",
        current: p1.netRevenue,
        previous: p2.netRevenue,
        change: Number(diff.netRevenue),
        isCurrency: true,
      },
      {
        metric: "Customers",
        current: p1.customers,
        previous: p2.customers,
        change: Number(diff.customers),
        isCurrency: false,
      },
    ];
  };
  useEffect(() => {
    if (data) {
      setChartData(data.chartData2lines);
      setPeriod1Label(getPeriodLabel(payload?.period1, payload?.type));
      setPeriod2Label(getPeriodLabel(payload?.period2, payload?.type));
      // Table ke liye full labels (April 2025)
      setTablePeriod1Label(getFullPeriodLabel(payload?.period1, payload?.type));
      setTablePeriod2Label(getFullPeriodLabel(payload?.period2, payload?.type));

      const metricsTable = transformMetricsData(data?.data?.comparison);
      setMetricsComparisonTable(metricsTable);
    }
  }, [data]);

  return (
    <div className="space-y-8">
      {isError ? (
        <Error403 />
      ) : (
        <>
          <FiltersSheet
            open={open}
            setOpen={setOpen}
            staticYears={staticYears}
            staticQuarters={staticQuarters}
            staticMonths={staticMonths}
            staticYears2={staticYears2}
            staticQuarters2={staticQuarters2}
            staticMonths2={staticMonths2}
            filterType={filterType}
            setFilterType={setFilterType}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedQuarter={selectedQuarter}
            setSelectedQuarter={setSelectedQuarter}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear2={selectedYear2}
            setSelectedYear2={setSelectedYear2}
            selectedQuarter2={selectedQuarter2}
            setSelectedQuarter2={setSelectedQuarter2}
            selectedMonth2={selectedMonth2}
            setSelectedMonth2={setSelectedMonth2}
            handleSubmit={handleSubmit}
          />
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-primary-text text-[22px] font-semibold">
                Retention Heatmap
              </h1>
              <p className="text-secondary-text text-sm">
                Visualize how your customer cohorts retain over time
              </p>
            </div>
            <Button variant={"main"} onClick={() => setOpen((prev) => !prev)}>
              <SlidersHorizontal />
              Filters
            </Button>
          </div>
          <Card>
            <CohortRetention2LineChart
              data={data?.data?.chartData2lines}
              filterType={payload?.type}
              period1Label={period1Label}
              period2Label={period2Label}
              isLoading={isLoading}
            />
          </Card>

          <Card>
            <CardContent>
              <MetricsComparisonTable
                data={metricsComparisonTable}
                period1Label={tablePeriod1Label}
                period2Label={tablePeriod2Label}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* {!data ? (
            <Card>
              <CardContent>
                <h2 className="text-xl">
                  Choose periods and filter types to view cards.
                </h2>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <MetricCard
                icon={retentionData.highest.icon}
                secondaryText={"Retention improved by"}
                primaryText={`${cohortPerformanceValues?.highestValue}% Retention`}
                chartComponent={<Chart1 />}
                loading={isLoading}
              />
              <MetricCard
                icon={retentionData.lowest.icon}
                secondaryText={`Upsells grew by`}
                primaryText={`Churn decreased by`}
                chartComponent={<Chart1 />}
                loading={isLoading}
              />
              <MetricCard
                icon={retentionData.average.icon}
                secondaryText={`Overall average: `}
                primaryText={`${cohortPerformanceValues?.averageValue}%`}
                chartComponent={<Chart2 />}
                loading={isLoading}
              />
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default page;
