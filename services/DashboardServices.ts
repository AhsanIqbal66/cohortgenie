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
        toast.error("Update user failed: No response from API");
        return { res: null, data: null };
      }
      const { status, data } = result;
      if (status === 200) {
        dispatch(loginn(data.user));
        return { res: { status }, data };
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

export const getDisconnect = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.DISSCONNECT}`,
    })
  );
};
export const getPlans = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.PLANS}`,
    })
  );
};
export const addSubscription = async (values: any) => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.ADD_SUBSCRIPTION}`,
      method: "POST",
      data: values,
    })
  );
};
export const updateMember = async (values: any) => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.UPDATE_MEMBER}`,
      method: "POST",
      data: values,
    })
  );
};
export const useGetUpdateMember = () => {
  const dispatch = useDispatch();
  const getUpdateMember = async (values: any) => {
    try {
      const result = await updateMember(values);

      if (!result) {
        toast.error("Update failed: No response from API");
        return { res: null, data: null };
      }

      const { status, data } = result;

      if (status === 200) {
        dispatch(loginn(data.user));
        toast.success("User updated successfully!");
        return { res: { status }, data };
      } else {
        toast.error("Update failed");
        return { res: null, data: null };
      }
    } catch (error: any) {
      console.log("Update Member Error:", error);
      toast.error(error?.data?.error || "Unexpected error occurred");
      return { res: null, data: null };
    }
  };

  return { getUpdateMember };
};
export const cancelPlan = async () => {
  return handleApiCall(() =>
    authRequest({
      url: `${ENDPOINTS.CANCEL_SUBSCRIPTION}`,
    })
  );
};
