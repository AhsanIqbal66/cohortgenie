"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CustomerRetentionChartData,
  months,
  monthsdata,
  quarterMatrix,
  quarters,
  statsData,
  yearMatrix,
  years,
} from "@/constants";
import { AlertCircle, ArrowRight, Download, MoveRight } from "lucide-react";
import RevenueDonutChart from "@/components/common/dashboard/RevenueDonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/common/dashboard/StatsCard";
import CustomerRetentionChart from "@/components/common/dashboard/CustomerRetentionChart";
import MonthlyCohortTable from "@/components/common/MonthlyCohortTable";
import InsightsCard from "@/components/common/dashboard/InsightsCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import YearlyCohortTable from "@/components/common/dashboard/YearlyCohortTable";
import QuartlyCohortTable from "@/components/common/dashboard/QuartlyCohortTable";
import { useGetDashboard } from "@/hooks/ReactQueryHooks/dashboard";
import Error404 from "@/components/common/Error404";
import { useRouter, useSearchParams } from "next/navigation";
import RevenueWaterfallChart from "@/components/common/dashboard/RevenueWaterfallChart";
import { useDispatch, useSelector } from "react-redux";
import { useGetUser } from "@/services/DashboardServices";
import { loginn } from "@/redux/userSlice";
import Error403 from "@/components/common/Error403";
import { RootState } from "@/redux/store";
const page = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  const isDemo = userData?.isDemo === true;
  console.log("🚀 ~ page ~ isDemo:", isDemo);
  const router = useRouter();
  const searchparam = useSearchParams();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const loginwithgoogle = searchparam.get("loginwithgoogle");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedType, setSelectedType] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const dispatch = useDispatch();
  const { getUser } = useGetUser();
  const [filters, setFilters] = useState({
    selectedYear: currentYear,
    selectedType: "month",
    selectedMonth: currentMonth,
    selectedQuarter: "",
  });
  const [chartValues, setChartValues] = useState([]);
  const {
    data: dashboardData,
    refetch,
    isLoading: loading,
    isError,
  } = useGetDashboard(filters);

  if (loginwithgoogle) {
    const fetchUser = async () => {
      const { res, data } = await getUser();
      if (res?.status === 200) {
        dispatch(loginn(data?.user));
      }
    };
    fetchUser();
  }
  useEffect(() => {
    if (selectedType === "month") {
      setSelectedQuarter("");
      if (!selectedMonth) setSelectedMonth("1");
    }
    if (selectedType === "quarter") {
      setSelectedMonth("");
      if (!selectedQuarter) setSelectedQuarter("1");
    }
    if (selectedType === "year" && selectedYear !== "All") {
      setSelectedYear("2025");
      setSelectedMonth("");
      setSelectedQuarter("");
    }
  }, [selectedType]);
  useEffect(() => {
    setFilters({
      selectedYear,
      selectedType,
      selectedMonth,
      selectedQuarter,
    });
  }, [selectedYear, selectedType, selectedMonth, selectedQuarter]);
  useEffect(() => {
    if (!dashboardData) return;

    if (selectedType === "month") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.weekly || []);
    }

    if (selectedType === "quarter") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.quarterly || []);
    }

    if (selectedType === "year") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.monthly || []);
    }
    if (selectedYear === "All") {
      setChartValues(dashboardData?.data?.cohortGenie?.trend?.yearly || []);
      setSelectedType("year");
    }
  }, [dashboardData, selectedType]);
  const rawData = [
    {
      name: "Expansion",
      value: dashboardData?.data?.cohortGenie?.summary?.metrics?.expansion,
      color: "#16A34A",
    },
    {
      name: "Contraction",
      value: dashboardData?.data?.cohortGenie?.summary?.metrics?.contraction,
      color: "#A78BFA",
    },
    {
      name: "Churned",
      value: dashboardData?.data?.cohortGenie?.summary?.metrics?.churn,
      color: "#EF4444",
    },
  ];
  return (
    <div className="space-y-6">
      {isError ? (
        <Error403 />
      ) : (
        <>
          <div className="flex flex-wrap gap-y-4 gap-x-3 items-center justify-between">
            <div>
              <h1 className="text-primary-text text-xl lg:text-[22px] font-semibold">
                Welcome back, {userData?.name} 👋
              </h1>
              <p className="text-secondary-text text-sm">
                Here's your business health at a glance
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full xl:max-w-[600] justify-end">
              <Select
                value={selectedYear}
                onValueChange={(year) => {
                  setSelectedYear(year);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedYear && selectedYear !== "All" && (
                <Select
                  value={selectedType}
                  onValueChange={(newType) => {
                    setSelectedType(newType);
                    setSelectedMonth("");
                    setSelectedQuarter("");
                  }}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {selectedType === "month" && (
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.id}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {selectedType === "quarter" && (
                <Select
                  value={selectedQuarter}
                  onValueChange={setSelectedQuarter}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select Quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    {quarters.map((quarter) => (
                      <SelectItem key={quarter.value} value={quarter.id}>
                        {quarter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select>
                <SelectTrigger className="w-full ">
                  <Download />
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"csv"}>CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Card className="py-0 sm:py-3">
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-0">
              {statsData.map((stat, index) => (
                <StatsCard
                  stat={stat}
                  key={index}
                  index={index}
                  statsData={statsData}
                  statsDataRes={
                    dashboardData?.data?.cohortGenie?.summary?.metrics
                  }
                  customers={
                    dashboardData?.data?.cohortGenie?.summary?.customers
                  }
                  loading={loading}
                />
              ))}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle> Customer Revenue by Cohort</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto px-0 sm:px-3 lg:px-5">
                <CustomerRetentionChart data={chartValues} loading={loading} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle> Revenue Waterfall</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto px-0 sm:px-3 lg:px-5">
                <RevenueWaterfallChart rawData={rawData} />
              </CardContent>
            </Card>

            <Card className="col-span-1  md:col-span-2">
              <CardHeader className="flex items-center flex-wrap justify-between flex-row">
                <CardTitle> Cohort Retention Heatmap </CardTitle>
                <Link
                  href={"/dashboard/heatmap"}
                  className="flex items-center gap-x-2 text-sm md:text-base text-[#9B6EEE] hover:underline underline-offset-2"
                >
                  View Full Heatmap <MoveRight size={16} />
                </Link>
              </CardHeader>
              <CardContent className="mt-auto px-1.5 sm:px-3 lg:px-5">
                {selectedYear === "All" && (
                  <YearlyCohortTable
                    matrix={
                      dashboardData?.data?.cohortGenie?.heatmap?.year
                        ?.yearMatrix
                    }
                    labels={
                      dashboardData?.data?.cohortGenie?.heatmap?.year?.years
                    }
                    loading={loading}
                  />
                )}
                {selectedType === "year" && selectedYear !== "All" && (
                  <MonthlyCohortTable
                    matrix={
                      dashboardData?.data?.cohortGenie?.heatmap?.month
                        ?.monthMatrix
                    }
                    labels={
                      dashboardData?.data?.cohortGenie?.heatmap?.month
                        ?.monthLabels
                    }
                    loading={loading}
                  />
                )}
                {selectedType === "quarter" && (
                  <QuartlyCohortTable
                    matrix={
                      dashboardData?.data?.cohortGenie?.heatmap?.quarter
                        ?.quarterMatrix
                    }
                    labels={
                      dashboardData?.data?.cohortGenie?.heatmap?.quarter
                        ?.quarterLabels
                    }
                    loading={loading}
                  />
                )}
                {selectedType === "month" && (
                  <QuartlyCohortTable
                    matrix={
                      dashboardData?.data?.cohortGenie?.heatmap?.month
                        ?.weekMatrix
                    }
                    labels={
                      dashboardData?.data?.cohortGenie?.heatmap?.month
                        ?.weekLabels
                    }
                    loading={loading}
                  />
                )}
              </CardContent>
            </Card>
            <Card className="md:row-start-2 md:col-start-2 2xl:col-start-3  col-span-1">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <InsightsCard
                  data={dashboardData?.data?.cohortGenie?.insights}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </div>
          <div
            className="relative w-full rounded-md border border-[#9B6EEE] bg-[#9B6EEE1A] px-6 py-4 
    flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                size={18}
                className="text-[#9B6EEE] translate-y-1 shrink-0"
              />
              <div className="flex flex-col gap-y-1">
                <span className="text-[#9B6EEE] font-medium text-sm">
                  Explore More Insights
                </span>
                <span className="text-[#9B6EEE] text-xs">
                  Compare Q2 vs Q3 performance or dive deeper into cohort
                  analysis
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:flex-none">
              <Button
                className="text-sm"
                variant={"main"}
                onClick={() => router.push("/dashboard/heatmap")}
              >
                Explore Heatmap <ArrowRight size={16} />
              </Button>
              <Button
                className="text-sm"
                variant={"outline"}
                onClick={() => router.push("/dashboard/comparison")}
              >
                Compare Periods <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
