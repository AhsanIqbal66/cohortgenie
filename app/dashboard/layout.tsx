"use client";
import { AppSidebar } from "@/components/common/dashboard/AppSidebar";
import DashboardHeader from "@/components/common/dashboard/DashboardHeader";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex">
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        className={`${collapsed ? "w-[250px] lg:w-16 " : "w-[250px] shadow-[0_0_0_5000px_rgba(0,0,0,0.3)] lg:shadow-none"}`}
      />
      <main
        className={`ml-auto ${collapsed ? "w-full lg:w-[calc(100%-63px)]" : "w-full lg:w-[calc(100%-250px)]"}`}
      >
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="pt-7 pb-6">
          <div className="container-fluid">{children}</div>
        </div>
      </main>
    </div>
  );
}
