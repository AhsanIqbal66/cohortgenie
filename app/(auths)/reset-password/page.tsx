"use client";

import { useState } from "react";
import { Formik, Form, } from "formik";
import InputField from "@/components/common/InputField";
import { ResetPasswordSchema } from "@/schema";
import { useLogin } from "@/hooks/ApiHooks/useLogin";
import Image from "next/image";
import LoginsSlider from "@/components/common/LoginsSlider";
import { loginSlides } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ResetPasswordd } from "@/services/auth/auth";
export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log("🚀 ~ ResetPasswordPAge ~ token:", token)
  const [loading, setLoading] = useState(false);
  const { ResetPassword } = useLogin();
  const handleSubmit = async (values: any) => {
    console.log("🚀 ~ handleSubmit ~ values:", values)
    try {
      setLoading(true);
      await ResetPassword(values);
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
      <div className="w-[54%] mx-auto flex flex-col justify-center px-[4vw] relative">
        <div className="w-full max-w-[385px] mx-auto">
          <Image src="/images/Logo.svg" width={193} height={36} alt="CohortGenie" className="h-9 w-auto mb-[5.5vh] mx-auto" />
          <h2 className="text-center text-2xl font-semibold text-primary-text mb-[1.5vh]">Reset Password?</h2>
          <p className="text-center text-secondary-text mb-[4.3vh]">
            Add your email to send recovery instructions
          </p>
          <Formik
            initialValues={{
              token: token || "",
              newPassword: "",
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-[2.6vh]">
                <InputField
                  label="New Password"
                  name="newPassword"
                  placeholder="••••••••"
                  type="password"
                  passwordicon={true}
                />
                <InputField
                  label="Confirm Password"
                  name="cpassword"
                  placeholder="••••••••"
                  type="password"
                  passwordicon={true}
                />
                <Button type="submit" disabled={loading} className="w-full mt-[2vh]">
                  {loading ? "Submiting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="flex justify-between items-center text-xs text-secondary-text bottom-[3.5vh] absolute w-full left-0 px-[4vw]">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span>Copyright 2025</span>
        </div>
      </div>
    </div>
  );
}
