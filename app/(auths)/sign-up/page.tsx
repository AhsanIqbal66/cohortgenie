"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useLogin } from "@/hooks/ApiHooks/useLogin";
import { LoginSchema, SignupSchema } from "@/schema";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginsSlider from "@/components/common/LoginsSlider";
import { loginSlides } from "@/constants";
import SignupForm from "@/components/common/auths/SignupForm";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { handleSignup } = useLogin();
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await handleSignup(values);
      setLoading(false);
    } catch (error) {
      console.error("Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-[46%] loginBg h-screen bg-violet-300 px-[2%] flex flex-col justify-center">
        <LoginsSlider slides={loginSlides} />
      </div>
      <div className="w-[54%] mx-auto flex flex-col justify-between px-[4vw]">
        <div className="w-full max-w-[385px] pt-[7.6vh] mx-auto">
          <Image src="/images/Logo.svg" width={193} height={36} alt="CohortGenie" className="h-9 w-auto mb-[5.5vh] mx-auto" />
          <h2 className="text-center text-2xl font-semibold mb-[3vh] text-primary-text">Welcome to Cohort Genie!</h2>
          {/* <p className="text-center text-secondary-text mb-[4.3vh]">
            Sign in to access your analytics
          </p> */}
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              keepMe: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <SignupForm loading={loading} values={values} />
            )}
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
