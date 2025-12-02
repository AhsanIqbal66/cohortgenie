// SyncingPage.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartIcon,
  CheckFillIcon,
  DatabaseIcon,
  GroupIcon,
  LockIcon,
} from "@/icons";
import { RootState } from "@/redux/store";
import {
  getCreditmemo,
  getCustomer,
  getInvoice,
  getRefundreceipt,
  getSalesreceipt,
  useGetUser,
} from "@/services/DashboardServices";
import { Check, Lock, Database, BarChart3, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// const syncSteps = [
//   {
//     id: 1,
//     title: "Connect to QuickBooks",
//     status: "completed",
//     icon: LockIcon,
//   },
//   {
//     id: 2,
//     title: "Fetching transaction data",
//     status: "completed",
//     icon: DatabaseIcon,
//   },
//   {
//     id: 3,
//     title: "Analyzing retention metrics",
//     status: "in-progress",
//     icon: ChartIcon,
//   },
// ];

interface SyncStepProps {
  title: string;
  status: any;
  Icon: React.ElementType;
}

const SyncStep = ({ title, status, Icon }: SyncStepProps) => {
  const baseClasses =
    "flex items-center justify-between p-4 rounded-lg border transition-colors duration-300";

  let statusClasses = "";
  let iconColor = "";
  let showLoader = false;

  if (status === "completed") {
    statusClasses = "bg-[#F0FDF4] border-[#9DDFB7] text-[#009A3E]";
    iconColor = "#009A3E";
  } else if (status === "loading") {
    statusClasses = "border-[#9B6EEE] text-[#9B6EEE]";
    iconColor = "#9B6EEE";
    showLoader = true;
  } else {
    statusClasses = "border-[#6B7280] text-[#6B7280] opacity-75";
    iconColor = "#6B7280";
  }

  return (
    <div className={`${baseClasses} ${statusClasses}`}>
      <div className="flex items-center space-x-3">
        <Icon color={iconColor} />
        <span className="font-medium text-sm">{title}</span>
      </div>

      {status === "completed" ? (
        <CheckFillIcon color="#009A3E" />
      ) : showLoader ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : null}
    </div>
  );
};

export default function InteStep2() {
  const [step1, setStep1] = useState("completed");
  const [step2, setStep2] = useState("inactive");
  const [step3, setStep3] = useState("inactive");
  const [userData, setUserData] = useState<any>(null);
  const [progressValue, setProgressValue] = useState(0);
  const router = useRouter();
  const hasRun = useRef(false);
  const { getUser } = useGetUser();
  useEffect(() => {
    const fetchUser = async () => {
      const { res, data } = await getUser();
      if (res?.status === 200) {
        setUserData(data.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!userData) return;
    if (!userData?.connection_flag) return;
    if (hasRun.current) return;
    hasRun.current = true;
    const runSync = async () => {
      try {
        setStep2("loading");

        const steps = [
          { fn: getInvoice, progress: 20 },
          { fn: getCustomer, progress: 40 },
          { fn: getSalesreceipt, progress: 60 },
          { fn: getRefundreceipt, progress: 80 },
          { fn: getCreditmemo, progress: 100 },
        ];
        for (let step of steps) {
          const res = await step.fn();
          if (res?.status === 200) {
            setProgressValue(step.progress);
          } else {
            setStep2("completed");
            return;
          }
        }
        setStep2("completed");
        setStep3("loading");
        setTimeout(() => {
          const fetchUser = async () => {
            const { res, data } = await getUser();
            if (res?.status === 200) {
              setUserData(data.user);
            }
          };
          fetchUser();
          setStep3("completed");
          router.push("/dashboard/home");
        }, 2000);
      } catch (err) {
        console.log("Sync Error:", err);
        setStep2("completed");
      }
    };
    runSync();
  }, [userData]);
  return (
    <>
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2 text-2xl text-primary-text font-semibold mb-6">
          <GroupIcon color="#9B6EEE" />
          <h1>Syncing your QuickBooks Data</h1>
        </div>
        <p className="text-secondary-text">
          We're analyzing your transactions and preparing your first dashboard
        </p>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col items-center px-16 py-4">
          <div className="bg-[#9B6EEE33] flex items-center rounded-full justify-center border-2 border-white w-20 h-20 outline-4 outline-[#9B6EEE33] mb-6">
            <div className="bg-[#283E6D] w-16 h-16 flex items-center justify-center rounded-full">
              <Image
                src="/images/logo-sm.svg"
                width={193}
                height={36}
                alt="CohortGenie"
                className="h-[47] w-[]47"
              />
            </div>
          </div>

          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-secondary-text">Progress</span>
              <span className="font-semibold text-primary-text flex items-center">
                {progressValue}%
                {step3 !== "completed" && (
                  <Loader2 className="h-4 w-4 text-gray-400 ml-1 animate-spin" />
                )}
              </span>
            </div>
            <Progress
              value={progressValue}
              className="h-2 [&>div]:bg-[#9B6EEE]"
            />
          </div>

          <div className="w-full space-y-6 mb-8">
            <SyncStep
              title="Connect to QuickBooks"
              status={step1}
              Icon={LockIcon}
            />

            <SyncStep
              title="Fetching transaction data"
              status={step2}
              Icon={DatabaseIcon}
            />

            <SyncStep
              title="Analyzing retention metrics"
              status={step3}
              Icon={ChartIcon}
            />
          </div>

          <p className="text-sm text-secondary-text text-center">
            This may take a few moments. Your Dashboard will load automatically
            when ready.
          </p>
        </CardContent>
      </Card>

      <div className="mt-10 flex items-center justify-center font-medium gap-x-4 text-sm text-secondary-text">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#9B6EEE1A]">
          <Lock className="h-4 w-4 text-purple-600" />
        </div>
        <span className="text-sm">
          Your data is encrypted and processed securely
        </span>
      </div>
    </>
  );
}
