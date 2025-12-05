import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ClockIcon } from "@/icons";

export default function InteStep3() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2 text-primary-text">
          <ClockIcon color="#9B6EEE" />
          Welcome to Your 14-Day Free Trial
        </h1>
        <p className="text-secondary-text mx-auto text-sm md:text-base">
          You now have full access to all CohortGenie Pro features — including
          analytics, heatmaps, comparison reports, and complete data sync.
        </p>
      </div>

      <Card className="w-full max-w-3xl border rounded-2xl mb-8 py-10 px-20">
        <CardContent className="">
          <h2 className="text-primary-text text-xl font-semibold mb-8">
            Trial Status
          </h2>
          <div className="flex flex-col gap-y-4 text-sm">
            {[
              "Full feature access",
              "Unlimited dashboard usage",
              "Complete QuickBooks sync",
              "All reports unlocked",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#009A3E] text-white">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-primary-text">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 items-center gap-4  max-w-[550px] mx-auto ">
        <Button variant="main">✔ Pay Now & Save</Button>
        <Button variant="outline">Continue Trial</Button>
      </div>
    </div>
  );
}
