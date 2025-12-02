import { authRequest, handleApiCall } from "@/lib/apiRequests";
import { ENDPOINTS } from "@/lib/endpoints";

export const getComparison = (queryParams: string): Promise<any> => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.COMPARISON}?${queryParams}`,
    })
  );
};
