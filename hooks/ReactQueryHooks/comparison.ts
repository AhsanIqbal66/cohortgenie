import { getComparison } from "@/services/comparisonServices";
import { useQuery } from "@tanstack/react-query";

export const useGetComparison = ({ filter }: any) => {
  const queryParams = new URLSearchParams(filter).toString();

  return useQuery({
    queryKey: ["comparison", filter],
    queryFn: () => getComparison(queryParams),
    enabled: !!filter?.type,
    staleTime: 0,
  });
};
