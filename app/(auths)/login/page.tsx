"use client";

import { useEffect, useState } from "react";
import { Formik } from "formik";
import Link from "next/link";
import { useLogin } from "@/hooks/ApiHooks/useLogin";
import { LoginSchema } from "@/schema";
import Image from "next/image";
import LoginsSlider from "@/components/common/LoginsSlider";
import { loginSlides } from "@/constants";
import LoginForm from "@/components/common/auths/LoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookies } from "@/hooks/useAuth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useLogin();
  const searchparam = useSearchParams();
  const token = searchparam.get("token");
  const connection_flag = searchparam.get("connection_flag");
  const router = useRouter();
  console.log("🚀 ~ LoginPage ~ token:", token);
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await handleLogin(values);
      setLoading(false);
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token && connection_flag === "false") {
      setCookies("token", token);
      router.push(`/integration?step=1&token=${token}`);
    } else if (token && connection_flag === "true") {
      setCookies("token", token);
      setTimeout(() => {
        router.push(`/dashboard/home?loginwithgoogle=true`);
      }, 1000);
    }
  }, [token, connection_flag]);
  if (token && connection_flag === "true") {
    return (
      <>
        <div className="flex items-center justify-center flex-col gap-y-5 h-screen">
          <Image
            src="/images/Logo.svg"
            width={193}
            height={36}
            alt="CohortGenie"
            className=" w-[50%] mb-[5.5vh] mx-auto"
          />
          <h1 className="text-primary-text text-4xl font-semibold">Signing In....</h1>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen flex">
      <div className="w-[46%] loginBg h-screen bg-violet-300 px-[2%] flex flex-col justify-center">
        <LoginsSlider slides={loginSlides} />
      </div>
      <div className="w-[54%] mx-auto flex flex-col justify-between px-[4vw]">
        <div className="w-full max-w-[385px] pt-[7.6vh] mx-auto">
          <Image
            src="/images/Logo.svg"
            width={193}
            height={36}
            alt="CohortGenie"
            className="h-9 w-auto mb-[5.5vh] mx-auto"
          />
          <h2 className="text-center text-2xl font-semibold mb-[1.2vh] text-primary-text">
            Welcome back!
          </h2>
          <p className="text-center text-secondary-text mb-[4.3vh]">
            Sign in to access your analytics
          </p>
          <Formik
            initialValues={{
              email: "",
              password: "",
              keepMe: false,
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => <LoginForm loading={loading} values={values} />}
          </Formik>
        </div>
        <div className="flex justify-between items-center text-xs text-secondary-text pb-[3.5vh]">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span>Copyright 2025</span>
        </div>
      </div>
    </div>
  );
}
