"use client";
import InteStep1 from "@/components/common/integrations/InteStep1";
import InteStep2 from "@/components/common/integrations/InteStep2";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/ApiHooks/useLogin";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
export default function IntegrationPage() {
  const params = useSearchParams();
  const step = params?.get("step");
  const { handleLogout } = useLogin();
  return (
    <div className="py-[2.5vh] min-h-screen flex flex-col justify-center">
      <div className="container-fluid">
        <div className="flex items-center justify-between  mb-[4vh]">
          <Image
            src="/images/Logo.svg"
            width={193}
            height={36}
            alt="CohortGenie"
            className="h-9 w-auto"
          />
          <Button
            onClick={handleLogout}
            variant="main"
            className="w-full sm:w-auto"
          >
            Logout
            <LogOut className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto">
        {step && step === "1" ? (
          <InteStep1 />
        ) : step === "2" ? (
          <InteStep2 />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
