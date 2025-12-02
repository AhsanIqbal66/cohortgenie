import { authRequest, handleApiCall } from "@/lib/apiRequests";
import { ENDPOINTS } from "@/lib/endpoints";
import { loginn } from "@/redux/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getLoginUser } from "./auth/auth";
export const getDashboard = async (queryParams: string): Promise<any> => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.COHORTDATA}?${queryParams}`,
    })
  );
};

export const getInvoice = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.INVOICE}`,
      method: "GET",
    })
  );
};
export const getCustomer = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.CUSTOMER}`,
      method: "GET",
    })
  );
};
export const getSalesreceipt = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.SALESRECEIPT}`,
      method: "GET",
    })
  );
};
export const getRefundreceipt = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.REFUNDRECEIPT}`,
      method: "GET",
    })
  );
};
export const getCreditmemo = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.CREDITMEMO}`,
      method: "GET",
    })
  );
};
export const useGetUser = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const result = await getLoginUser();

      if (!result) {
        toast.error("Login failed: No response from API");
        return { res: null, data: null };
      }

      const { status, data } = result;

      if (status === 200) {
        dispatch(loginn(data.user)); // 👍 dispatch here
        return { res: { status }, data }; // 👍 return clean data
      } else {
        toast.error("Login failed");
        return { res: null, data: null };
      }
    } catch (error: any) {
      console.log("Get User Error:", error);
      toast.error(error?.data?.error || "Unexpected error occurred");
      return { res: null, data: null };
    }
  };

  return { getUser };
};
