"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CalendarDays, Link as LinkIcon, Unplug } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatRelativeDate } from "@/utils/DateFormate";
import Link from "next/link";
import { getDisconnect, useGetUser } from "@/services/DashboardServices";
import toast from "react-hot-toast";
const page = () => {
  const [countdown, setCountdown] = useState("");
  const getNextSyncDate = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(2, 0, 0, 0);
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }
    return target;
  };
  const calculateCountdown = () => {
    const now = new Date();
    const target = getNextSyncDate();
    const diffMs = target.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} minutes`;
  };

  useEffect(() => {
    setCountdown(calculateCountdown());
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);
  const userData = useSelector((state: RootState) => state.user.user);
  const formattedDate = formatRelativeDate(userData?.last_sync, "en-US");
  console.log("🚀 ~ page ~ userData:", userData?.last_sync);
  console.log("🚀 ~ page ~ userData:", userData?.connection_flag);

  const { getUser } = useGetUser();

  const handleDisconnect = async () => {
    try {
      const result = await getDisconnect();

      if (result?.status === 200) {
        toast.success("Disconnected Successfully");

        await getUser();
      } else {
        toast.error("Failed to disconnect");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-y-3 items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-primary-text text-[22px] font-semibold">
            Integrations
          </h1>
          <p className="text-secondary-text text-sm">
            Connect your tools to sync business data.
          </p>
        </div>
        <Link
          href={`/integration?step=2`}
          className="group flex items-center bg-[#9B6EEE] border text-white border-[#9B6EEE] py-2 px-3 rounded-md group hover:bg-transparent hover:text-[#9B6EEE] transition duration-200 cursor-pointer gap-x-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6! h-6! transition duration-200"
          >
            <path
              d="M15 3.98926L9.5 3.99979V8.99981H2V15.9998H10.4998"
              className="stroke-white group-hover:stroke-[#9B6EEE] transition duration-200"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 21L15.5 20.9895V15.7894H22V9H15.1724"
              className="stroke-white group-hover:stroke-[#9B6EEE] transition duration-200"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sync All Integrations
        </Link>
      </div>
      <Card className="w-full max-w-[900px]">
        <CardContent className="space-y-8">
          <div className="flex flex-col-reverse sm:flex-row gap-y-2 items-start sm:items-center justify-between gap-x-2.5 lg:gap-x-5">
            <div className="flex items-center gap-x-3 w-full">
              <div className="w-14 h-14 shrink-0 rounded-md flex items-center justify-center bg-[#F4F4F5]">
                <div className="p-1 bg-white border border-[#E5E7EB] flex items-center justify-center rounded-sm">
                  <Image
                    src={"/images/qblogo.png"}
                    alt="qb logo"
                    width={34}
                    height={34}
                    className=""
                  />
                </div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-medium mb-1">QuickBooks Online</h1>
                <p className="text-xs sm:text-sm text-secondary-text">
                  Sync your invoices, revenue, and cohort data directly from
                  QuickBooks.
                </p>
              </div>
            </div>
            {userData?.connection_flag === true ? (
              <div className="shrink-0 flex ml-auto items-center gap-2 bg-[#F0FDF4] text-[#009A3E] px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 rounded-full bg-[#009A3E]"></span>
                Connected
              </div>
            ) : (
              <div className="shrink-0 flex ml-auto  items-center gap-2 bg-red-50 text-red-400 px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                Disconnected
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-xl px-5 py-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-secondary-text text-sm mb-1">
                <Clock className="w-6! h-6!" /> Last synced
              </div>
              <p className="text-sm md:text-base text-secondary-text font-semibold">
                {formattedDate}
              </p>
            </div>

            <div className="border border-[#9B6EEE] rounded-xl px-5 py-4 bg-[#F5F1FE] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-primary-text text-sm mb-2">
                <CalendarDays className="w-6 h-6" /> Next sync
              </div>
              <p className="text-sm md:text-base font-semibold text-[#9B6EEE]">
                {countdown}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 ">
            {userData?.connection_flag === true ? (
              <Button
                variant="outline"
                className="group"
                onClick={handleDisconnect}
              >
                <Unplug className="w-4 h-4 mr-2 text-[#9B6EEE] group-hover:text-white" />
                Disconnect
              </Button>
            ) : (
              <Button variant={"main"} className="">
                <LinkIcon className="w-4 h-4 mr-2" />
                Reconnect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default page;
