import { CheckFillIcon } from "@/icons";
import {
  addSubscription,
  updateMember,
  useGetUpdateMember,
} from "@/services/DashboardServices";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FeatureItem = ({ text, isIncluded, highlight }: any) => {
  console.log("🚀 ~ FeatureItem ~ isIncluded:", isIncluded);
  const iconColor = isIncluded ? "#4CAF50" : "#6B7280";

  return (
    <li className={`flex items-start space-x-3 mb-3 `}>
      <CheckFillIcon color={iconColor} />
      <span
        className={`${isIncluded === false && highlight === true ? "text-secondary-text!" : ""} text-sm ${isIncluded ? "text-primary-text" : "text-secondary-text"} ${highlight === true ? "text-white" : ""} `}
      >
        {text}
      </span>
    </li>
  );
};
const CustomButton = ({ variant, children, onClick }: any) => {
  let classes =
    "w-full py-3 rounded-md font-semibold text-sm transition duration-300 cursor-pointer ";
  if (variant === "default") {
    classes += "bg-[#E5E7EB] text-secondary-text";
  } else if (variant === "pro") {
    classes += "bg-[#9B6EEE] text-white hover:bg-tranparent ";
  } else if (variant === "outline") {
    classes +=
      "border border-violet-400 text-violet-600 bg-white hover:bg-violet-50 hover:text-violet-700";
  }
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
export const PricingCard = ({ plan }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getUpdateMember } = useGetUpdateMember();
  const session_id = searchParams.get("session_id");
  console.log("🚀 ~ PricingCard ~ session_id:", session_id);
  const isPro = plan.highlight;
  const cardClasses = isPro
    ? "bg-[#151E2D] text-white"
    : "bg-white text-gray-900 border border-gray-100";
  const descriptionColor = isPro ? "text-[#ABACAF]" : "text-secondary-text";
  const featureListTextColor = isPro ? "text-white" : "text-primary-text";
  const handlePlane = async (planId: string) => {
    try {
      const result = await addSubscription({ plan: planId });
      if (!result) {
        toast.error("Subscription failed: No response from API");
        return { res: null, data: null };
      }
      const { status, data } = result;
      if (status === 200) {
        router.push(data?.session);
      }
    } catch (error) {
      console.log(error);
      return { res: null, data: null };
    }
  };
  useEffect(() => {
    const updateUser = async () => {
      if (session_id) {
        toast.success("Subscription updated successfully!");
        const result = await getUpdateMember({ sessionId: session_id });
        router.replace("/dashboard/billing");
      }
    };
    updateUser();
  }, [session_id]);

  return (
    <div
      className={`w-full border border-[#E5E7EB] rounded-2xl p-2.5 transition-all duration-300 ${cardClasses} flex flex-col h-full overflow-hidden shadow-[0_0_4px_0_rgba(0,0,0,0.1)] ${isPro ? "bg-[#151E2D]" : "bg-white"}`}
    >
      <div
        className={`shadow-[0_0_4px_0_rgba(0,0,0,0.1)] rounded-xl p-4 mb-4 ${isPro ? "bg-[#2E3643]" : "bg-white"}`}
      >
        <h3
          className={`text-xl font-bold mb-2 ${isPro ? "text-white" : "text-primary-text"}`}
        >
          {plan.title}
        </h3>
        <p className={`text-sm ${descriptionColor}`}>{plan.description}</p>
      </div>
      <div className={`flex flex-col grow px-4`}>
        <div className="mb-4">
          <span
            className={`text-4xl font-extrabold ${isPro ? "text-white" : "text-primary-text"}`}
          >
            {plan.price}
          </span>
          <span className={`text-base font-medium ml-1 ${descriptionColor}`}>
            / Month
          </span>
        </div>
        <div className="pb-4 border-b border-[#E5E7EB] mb-4">
          <CustomButton
            variant={plan.buttonVariant}
            onClick={() => handlePlane(plan?.planId)}
          >
            {plan.buttonText}
          </CustomButton>
        </div>
        <div className="">
          <h4 className={`text-sm font-semibold mb-4 ${featureListTextColor}`}>
            Included features:
          </h4>
          <ul>
            {plan.features.map((feature: any, index: any) => (
              <FeatureItem
                key={index}
                text={feature.text}
                highlight={plan.highlight}
                isIncluded={feature.included}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
