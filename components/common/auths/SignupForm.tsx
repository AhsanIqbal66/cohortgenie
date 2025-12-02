import { Field, Form } from "formik";
import React from "react";
import InputField from "../InputField";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SignupForm = ({ loading, values }: any) => {
  const router = useRouter();
  return (
    <Form className="space-y-[2.6vh]">
      <InputField
        label="Name*"
        name="name"
        placeholder="Enter your name"
        type="text"
      />
      <InputField
        label="Email*"
        name="email"
        placeholder="you@company.com"
        type="email"
      />
      <div className="space-y-[1.2vh]">
        <InputField
          label="Password*"
          name="password"
          placeholder="••••••••"
          type="password"
          // passwordicon={true}
        />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-primary-text">
            <Field
              type="checkbox"
              name="keepMe"
              className="accent-[#9B6EEE] rounded-full"
            />
            <span>
              I have read and agree{" "}
              <Link href={"#"} className="text-[#9B6EEE] hover:underline">
                Term&apos;s and conditions
              </Link>{" "}
            </span>
          </label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full mt-[2vh]">
        {loading ? "Signing up..." : "Signup"}
      </Button>

      <div className="flex items-center gap-4 py-[1.2vh]">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-400 text-sm">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button
        type="button"
        onClick={() => router.push("http://localhost:5000/auth/google")}
        className="w-full border border-[#E5E7EB] font-medium text-secondary-text py-3 rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition cursor-pointer"
      >
        <img src="/images/google.svg" alt="Google" className="h-5 w-5" />
        Continue with Google
      </button>
      <p className="text-center text-sm text-secondary-text mt-[4vh]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#9B6EEE] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;
