import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pricingPlans } from "@/constants";
import { PricingCard } from "./PricingCard";
const PlansCardsPopup = ({ open, setOpen, extractedPlans }: any) => {
  console.log("🚀 ~ PlansCardsPopup ~ extractedPlans:", extractedPlans);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[96%] sm:max-w-[1250px] rounded-2xl p-8 shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-2 sm:mb-4 xl:mb-6">
          <DialogTitle className="text-base md:text-lg xl:text-xl font-semibold text-primary-text">
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription>
            Choose a plan that fits your needs. You can change or cancel
            anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-5 lg:gap-8 justify-items-center">
          {extractedPlans?.map((plan: any, index: number) => (
            <PricingCard plan={plan} key={index} />
          ))}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlansCardsPopup;
