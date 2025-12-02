import { getDashboard } from "@/services/DashboardServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// export const useGetDashboard = (filters: any) => {
//   console.log("🚀 ~ useGetDashboard ~ filters:", filters);

//   const params:any = {
//     type: filters.selectedType,
//   };
//   if (filters.selectedYear) {
//     params.year = filters.selectedYear.toString();
//   }
//   if (filters.selectedType === "month") {
//     params.month = filters.selectedMonth.toString();
//   } else if (filters.selectedType === "quater") {
//     params.quarter = filters.selectedQuarter.toString();
//   }
//   const queryParams = new URLSearchParams(params).toString();
//   return useQuery({
//     queryKey: ["getDashboardData", filters],
//     queryFn: () => getDashboard(queryParams),
//     staleTime: 0,
//     enabled: !!filters,
//   });
// };

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
