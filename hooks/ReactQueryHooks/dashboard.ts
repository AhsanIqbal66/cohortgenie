import { getDashboard, getPlans } from "@/services/DashboardServices";
import { useQuery } from "@tanstack/react-query";
export const useGetDashboard = (filters: any) => {
  console.log("🚀 ~ useGetDashboard ~ filters:", filters);
  let params: any = {
    type: filters.selectedType,
    year: filters.selectedYear?.toString(),
  };
  if (filters.selectedType === "month") {
    params.month = filters.selectedMonth?.toString();
  } else if (filters.selectedType === "quarter") {
    params.quarter = filters.selectedQuarter?.toString();
  } else if (filters.selectedType === "year") {
  }
  const queryParams = new URLSearchParams(params).toString();
  return useQuery({
    queryKey: ["getDashboardData", filters],
    queryFn: () => getDashboard(queryParams),
    staleTime: 0,
    enabled: !!filters.selectedType,
  });
};
export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlans(),
    staleTime: 0,
  });
};
