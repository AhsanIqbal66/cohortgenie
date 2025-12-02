import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Lock,
  RefreshCcw,
  BarChart,
  LayoutDashboard,
  CircleCheckBig,
} from "lucide-react";
import { CheckIcon, DataIcon, FlowerIcon, SearchStatusIcon } from "@/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetUser } from "@/services/DashboardServices";
import { loginDemo, loginn } from "@/redux/userSlice";
const ProcessStep = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex flex-col items-center text-center p-4 border border-[#E5E7EB] rounded-lg">
    <div className="bg-[#9B6EEE1A rounded-full mb-4 border border-[#E5E7EB] w-8 h-8 flex items-center justify-center">
      <Icon className="" color="#9B6EEE" />
    </div>
    <p className="text-sm font-medium text-primary-text">{title}</p>
  </div>
);
export const quickbooksAuth = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/quickbooks/auth", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("API error: " + res.statusText);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("QuickBooks Auth Error:", error);
    return null;
  }
};
const InteStep1 = () => {
  const searchparam = useSearchParams();
  const token = searchparam.get("token");
  const userData = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getUser } = useGetUser();
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const { res, data } = await getUser();
        if (res?.status === 200) {
          dispatch(loginn(data?.user));
        }
      };
      fetchUser();
    }
  }, [token]);
  useEffect(() => {
    if (userData?.connection_flag === true) {
      router.push("/dashboard/home");
    }
  }, [userData]);
  const loginWithQuickbooks = () => {
    window.location.href = `http://localhost:5000/api/quickbooks/auth?user_id=${userData?._id}`;
  };
  // const handleDemoLogin = () => {
  //   const fetchUser = async () => {
  //     const { res, data } = await getUser();
  //     if (res?.status === 200) {
  //       dispatch(loginDemo(data?.user));
  //     }
  //   };
  //   fetchUser();
  //   router.push("/dashboard/home");
  // };
  return (
    <>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <FlowerIcon color={"#9B6EEE"} />
        <h1 className="text-2xl font-semibold text-primary-text">
          Integrations
        </h1>
      </div>
      <p className="text-secondary-text text-center mb-10">
        Connect your QuickBooks account to sync your business data.
      </p>
      <Card className="mb-6">
        <CardContent className="py-4 px-20">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 shrink-0 rounded-md flex items-center justify-center bg-[#F4F4F5] p-1">
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
            {/* <div className="flex items-center space-x-1 text-sm text-secondary-text py-1 px-3 bg-[#F3F4F6] rounded-full">
              <div className="w-2 h-2 rounded-full bg-secondary-text"></div>
              <span>Not Connected</span>
            </div> */}
          </div>
          <h1 className="text-xl font-medium mb-1.5">QuickBooks Online</h1>
          <p className="text-sm text-secondary-text mb-8">
            Sync customer transactions, revenue data, and billing information to
            analyze retention metrics.
          </p>
          <div className="flex justify-end">
            <Button className="" variant={"main"} onClick={loginWithQuickbooks}>
              <CircleCheckBig className="mr-2 h-5 w-5" />
              Connect QuickBooks
            </Button>
            {/* <Button variant="outline" onClick={handleDemoLogin}>
              Skip / Try Demo
            </Button> */}
          </div>
        </CardContent>
      </Card>

      <div className="w-ful rounded-lg bg-[#9B6EEE1A] border border-[#9B6EEE] py-4 px-20 mb-10">
        <div className="flex items-start space-x-3">
          <Lock className="h-6 w-6 text-[#9B6EEE] shrink-0 translate-y-1" />
          <div>
            <p className="font-medium text-[#9B6EEE] mb-1">Secure & Private</p>
            <p className="text-xs text-[#9B6EEE]">
              Once connected, CohortGenie will automatically analyze and
              visualize your retention metrics. We only access the data needed
              for analytics and never share your information.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="  text-secondary-text mb-6">
          What happens after you connect?
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <ProcessStep icon={DataIcon} title="We sync your data securely" />
          <ProcessStep
            icon={SearchStatusIcon}
            title="We analyze your metrics"
          />
          <ProcessStep icon={CheckIcon} title="Your dashboard is ready!" />
        </div>
      </div>
    </>
  );
};

export default InteStep1;
