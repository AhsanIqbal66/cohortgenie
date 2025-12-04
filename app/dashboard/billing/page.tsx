"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, UploadICon } from "@/icons";
import { AlertCircle, ArrowRight, X, XIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Download } from "lucide-react";
import DynamicTable from "@/components/DynamicTable";
import { billingData, pricingPlans } from "@/constants";
import jsPDF from "jspdf";
import { useGetPlans } from "@/hooks/ReactQueryHooks/dashboard";
import { PricingCard } from "@/components/common/PricingCard";
import PlansCardsPopup from "@/components/common/PlansCardsPopup";

const generateReceiptPDF = async (row: any) => {
  const pdf = new jsPDF("p", "mm", "a4");

  // Set font styles
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("Billing Receipt", 105, 20, { align: "center" });

  // Add content
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  pdf.setFont("helvetica", "bold");
  pdf.text("Invoice ID:", 20, 40);
  pdf.setFont("helvetica", "normal");
  pdf.text(row.invoiceId, 60, 40);

  pdf.setFont("helvetica", "bold");
  pdf.text("Date:", 20, 50);
  pdf.setFont("helvetica", "normal");
  pdf.text(row.date, 60, 50);

  pdf.setFont("helvetica", "bold");
  pdf.text("Amount:", 20, 60);
  pdf.setFont("helvetica", "normal");
  pdf.text(`$${row.amount}`, 60, 60);

  pdf.setFont("helvetica", "bold");
  pdf.text("Status:", 20, 70);
  pdf.setFont("helvetica", "normal");
  pdf.text(row.status, 60, 70);

  // Add footer
  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text("Thank you for your purchase.", 105, 90, { align: "center" });

  // Generate blob and download
  const pdfBlob = pdf.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${row.invoiceId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const billingColumns: any = [
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    accessorFn: (row: any) => <div className="font-medium">{row?.date}</div>,
  },
  {
    id: "invoiceId",
    header: "Invoice ID",
    accessorKey: "invoiceId",
    accessorFn: (row: any) => (
      <div
        className="font-medium text-secondary-text"
        onClick={() => console.log("Open invoice", row?.invoiceId)}
      >
        {row?.invoiceId}
      </div>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    accessorFn: (row: any) => (
      <div className="text-secondary-text font-medium">${row?.amount}</div>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    accessorFn: (row: any) => {
      const status = row?.status;
      const styles: any = {
        Paid: "bg-green-100 text-green-600 gap-x-1.5 py-1 px-3 rounded-sm",
        Failed: "bg-red-100 text-red-500 gap-x-1.5 py-1 px-3 rounded-sm",
      };

      return (
        <Badge className={styles[status]}>
          {status === "Failed" ? (
            <AlertCircle className="w-3 h-3 " />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#009A3E]"></span>
          )}
          {status}
        </Badge>
      );
    },
  },
  {
    id: "action5",
    header: "Action",
    accessorFn: (row: any) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => generateReceiptPDF(row)}
        className="border-none gap-x-0.5"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    ),
  },
];

const page = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(true);
  const planName: string = "Pro Plan";
  const planPrice: string = "$99/month";
  const nextBillingDate: string = "December 4, 2025";
  const status: string = "Active";
  const handleCancel = () => {
    console.log("Cancel Plan clicked");
  };
  const { data: plansData, isLoading } = useGetPlans();

  const [updatedPricingPlans, setUpdatedPricingPlans] = useState(pricingPlans);

  const extractedPlans = useMemo(() => {
    const plansArray = plansData?.data?.plans?.data ?? [];
    return plansArray
      .slice(1, 4)
      .map((plan: any) => ({
        planId: plan.id,
        price: plan.amount / 100,
      }))
      .reverse();
  }, [plansData]);

  useEffect(() => {
    if (!extractedPlans?.length) return;

    const newPlans = pricingPlans.map((existingPlan, index) => {
      // Index mapping: swap positions
      let extractedIndex;
      if (index === 1) {
        extractedIndex = 1; // Index 1 gets data from extractedPlans[1] (which is index 3 from original)
      } else if (index === 3) {
        extractedIndex = 0; // Index 3 gets data from extractedPlans[0] (which is index 1 from original)
      } else {
        extractedIndex = index; // Other indices remain unchanged
      }

      if (extractedPlans[extractedIndex]) {
        return {
          ...existingPlan,
          planId: extractedPlans[extractedIndex].planId,
          price: `$${extractedPlans[extractedIndex].price}`,
        };
      }
      return existingPlan;
    });

    setUpdatedPricingPlans(newPlans);
  }, [extractedPlans, pricingPlans]);
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-secondary-text">
          Manage your plan, payments, and billing history.
        </p>
      </div>

      <div className="flex gap-6 mb-8">
        <Card className="w-[40%]">
          <CardContent className="pt-6 flex flex-col h-full ">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-primary-text">
                  Current Plan
                </h3>
                <Badge className="bg-[#e1fde9] text-[#009A3E] gap-x-2 py-1.5 px-2.5">
                  <CheckIcon className="w-3.5 h-3.5 fill-[#7cd19e] stroke-[#009A3E]" />
                  {status}
                </Badge>
              </div>
              <div className="space-y-1 mb-2">
                <p className="text-lg font-bold text-primary-text">
                  {planName}
                </p>
                <p className="text-2xl font-bold text-[#9B6EEE]">{planPrice}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-6">
              <p className="text-sm text-blue-900">
                Next billing date: {nextBillingDate}
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-auto">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-[#E5E7EB] text-secondary-text"
              >
                <XIcon className="w-4 h-4" /> Cancel Plan
              </Button>
              <Button
                onClick={() => setOpen(true)}
                variant={"main"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <UploadICon color={isHovered ? "#9B6EEE" : "#fff"} /> Update
                Plan
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="w-[60%]">
          <CardContent className="pt-6">
            <DynamicTable columns={billingColumns} data={billingData} />
          </CardContent>
        </Card>
      </div>
      <div className="relative w-full rounded-md border border-[#9B6EEE] bg-[#9B6EEE1A] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={18}
            className="text-[#9B6EEE] translate-y-1 shrink-0"
          />
          <div className="flex flex-col gap-y-1">
            <span className="text-[#9B6EEE] font-medium text-sm">
              Manage Subscription in Stripe
            </span>
            <span className="text-[#9B6EEE] text-xs">
              View invoices, update payment details, and manage subscription
              securel
            </span>
          </div>
        </div>
        <Button
          className="text-sm"
          variant={"outline"}
          // onClick={() => router.push("/dashboard/comparison")}
        >
          Open Stripe Portal <ArrowRight size={16} />
        </Button>
      </div>

      <div className="min-h-screen bg-gray-50 p-4 sm:p-10 font-[Inter]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 hidden">
            Pricing Table
          </h1>
        </div>
      </div>
      <PlansCardsPopup
        open={open}
        setOpen={setOpen}
        extractedPlans={updatedPricingPlans}
      />
    </>
  );
};

export default page;
