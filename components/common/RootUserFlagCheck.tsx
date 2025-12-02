"use client";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RootUserFlagCheck = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  const searchParams = useSearchParams();
  const demo = searchParams.get("demo");
  const router = useRouter();
  useEffect(() => {
    if (userData?.connection_flag === false && demo !== "true") {
      router.push("/integration?step=1");
    }
  }, [userData?.connection_flag, demo]);

  return <></>;
};

export default RootUserFlagCheck;
