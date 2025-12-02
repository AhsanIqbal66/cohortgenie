import { authRequest, handleApiCall, publicRequest } from "@/lib/apiRequests";
import { ENDPOINTS } from "@/lib/endpoints";
import { AuthResponse } from "@/types";

export const login = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.LOGIN,
      method: "POST",
      data: values,
    })
  );
export const getLoginUser = async () =>
  await handleApiCall<AuthResponse>(() =>
    authRequest<AuthResponse>({
      url: ENDPOINTS.GETLOGIN,
    })
  );
export const SignUp = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.SIGNUP,
      method: "POST",
      data: values,
    })
  );
export const VerifyCode = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.VERIFYCODE,
      method: "POST",
      data: values,
    })
  );
export const TwoFACode = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.TWOFA,
      method: "POST",
      data: values,
    })
  );
export const ForgotPasswordd = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.FORGOTPASSWORD,
      method: "POST",
      data: values,
    })
  );
export const ResetPasswordd = async (values: any) =>
  await handleApiCall<AuthResponse>(() =>
    publicRequest<AuthResponse>({
      url: ENDPOINTS.RESETPASSWORD,
      method: "POST",
      data: values,
    })
  );
export const RoleUpdate = async (id?: any, role?: any) =>
  await handleApiCall<AuthResponse>(() =>
    authRequest<AuthResponse>({
      url: id
        ? `${ENDPOINTS.SWITCH_ROLE}?${role}=${id}`
        : `${ENDPOINTS.SWITCH_ROLE}`,
    })
  );
