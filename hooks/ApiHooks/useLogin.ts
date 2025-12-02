"use client";
import { useState } from "react";
import { removeCookies, setCookies } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  ForgotPasswordd,
  login,
  ResetPasswordd,
  SignUp,
  // TwoFACode,
  // VerifyCode,
} from "@/services/auth/auth";
import { loginn, logout, signup } from "@/redux/userSlice";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignup = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await SignUp(values);
      if (!result) {
        toast.error("Signup failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 201) {
        toast.success("Signup successful");
        setCookies("token", data.token);
        dispatch(signup(data.user));
        router.push(`/integration?step=1`);
      } else {
        toast.error("Signup failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || "Signup error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const result = await login(values);
      if (!result) {
        toast.error("No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 200) {
        toast.success("Login successfull");
        setCookies("token", data?.token);
        dispatch(loginn(data?.user));
        setTimeout(() => {
          if (data?.connection_flag === false) {
            router?.push("/integration?step=1");
          } else {
            router?.push("/dashboard/home");
          }
        }, 1000);
      } else {
        toast.error("API returned error");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    setLoading(true);
    try {
      removeCookies("token");
      localStorage.clear();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // const Varify2FA = async (values: { email: string; password: string }) => {
  //   setLoading(true);
  //   try {
  //     const result = await TwoFACode(values);
  //     if (!result) {
  //       toast.error("Two step varification failed: No response from API");
  //       return;
  //     }
  //     const { status, data } = result;
  //     if (status === 200) {
  //       if (data?.loginExpired === true) {
  //         router.push(`/2fa`);
  //       } else if (data?.loginExpired === false) {
  //         toast.success("Login successful");
  //         setCookies("token", data.data.token);
  //         setCookies("role", data.data?.role);
  //         dispatch(loginn(data.data));
  //         if (data?.data?.role === "admin") {
  //           router.push(`/admin/dashboard/`);
  //         } else {
  //           router.push(`/dashboard/home/`);
  //         }
  //       }
  //       // console.log(data?.data?.token);
  //       // router.push(`/${data?.data?.role}/dashboard`);
  //     } else {
  //       toast.error("Login failed: API returned error");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(
  //       error?.data?.message || "Varifying error: Unexpected error occurred"
  //     );
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const VarifyPasswordCode = async (values: {
  //   email: string;
  //   password: string;
  // }) => {
  //   setLoading(true);
  //   try {
  //     const result = await VerifyCode(values);
  //     if (!result) {
  //       toast.error("Failed password varification: No response from API");
  //       return;
  //     }
  //     const { status, data } = result;
  //     if (status === 200) {
  //       if (data?.loginExpired === true) {
  //         router.push(`/2fa`);
  //       } else if (data?.loginExpired === false) {
  //         toast.success("Login successful");
  //         setCookies("token", data.data.token);
  //         setCookies("role", data.data?.role);
  //         dispatch(loginn(data.data));
  //       }
  //     } else {
  //       toast.error("Login failed: API returned error");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(
  //       error?.data?.message || "Login error: Unexpected error occurred"
  //     );
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const ForgotPassword = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const result = await ForgotPasswordd(values);
      if (!result) {
        toast.error("Forgot password failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 200) {
        toast.success(
          data?.message || "Password reset link has been sent to your email"
        );
        router.push(`/login`);
        setLoading(false);
      } else {
        toast.error("Forgot password failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          "Forgot password error: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const ResetPassword = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await ResetPasswordd(values);
      if (!result) {
        toast.error("Reset passwordd failed: No response from API");
        return;
      }
      const { status, data } = result;
      if (status === 200) {
        router.push(`/login`);
        setLoading(false);
      } else {
        toast.error("Reset passwordd failed: API returned error");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message ||
          "Reset passwordd failed: Unexpected error occurred"
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return {
    handleLogin,
    handleSignup,
    handleLogout,
    loading,
    ForgotPassword,
    ResetPassword,
    // Varify2FA,
    // VarifyPasswordCode,
  };
};
