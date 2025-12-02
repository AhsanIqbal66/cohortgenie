"use client";
import biglogo from "../../../public/images/Logo.svg";
import logosm from "../../../public/images/logo-sm.svg";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  ComparisonFillIcon,
  ComparisonIcon,
  HeatMapFillIcon,
  HeatMapIcon,
  HomeFillIcon,
  HomeIcon,
  ItegrationsFillIcon,
  ItegrationsIcon,
  MenuIcon,
} from "@/icons";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
    icon: HomeIcon,
    fillIcon: HomeFillIcon,
  },
  {
    title: "Heatmap",
    url: "/dashboard/heatmap",
    icon: HeatMapIcon,
    fillIcon: HeatMapFillIcon,
  },
  {
    title: "Comparison",
    url: "/dashboard/comparison",
    icon: ComparisonIcon,
    fillIcon: ComparisonFillIcon,
  },
  {
    title: "Integrations",
    url: "/dashboard/integrations",
    icon: ItegrationsIcon,
    fillIcon: ItegrationsFillIcon,
  },
];
// const items2 = [
//   { title: "Help", url: "/dashboard/help", icon: HelpIcon, fillIcon: HomeFillIcon },
//   { title: "Settings", url: "/dashboard/settings", icon: HeatMapIcon, fillIcon: HeatMapFillIcon },
// ];
const MenuItem = ({ item, collapsed }: any) => {
  const pathname = usePathname();
  console.log("🚀 ~ MenuItem ~ pathname:", pathname);
  const [hover, setHover] = useState(false);
  return (
    <li key={item.title} className="flex items-center w-full">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link
            href={item?.url}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`flex items-center gap-x-3 w-full ${collapsed ? "px-4 justify-center" : "px-5"} hover:bg-purple-50 py-4 hover:text-[#9B6EEE] ${item?.url === pathname ? "text-[#9B6EEE]" : "text-secondary-text"}`}
          >
            {item?.url === pathname ? (
              <item.fillIcon className="shrink-0" color={"#9B6EEE"} />
            ) : (
              <item.icon
                className="shrink-0"
                color={hover ? "#9B6EEE" : "#6B7280"}
              />
            )}
            {!collapsed && <span className="text-base">{item.title}</span>}
          </Link>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="text-xs">
            {item.title}
          </TooltipContent>
        )}
      </Tooltip>
    </li>
  );
};
export function AppSidebar({ className, collapsed, setCollapsed }: any) {
  return (
    <TooltipProvider>
      <aside
        className={`fixed h-screen bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-all duration-300 z-50 ${collapsed ? "-left-full lg:left-0" : ""} ${className}`}
      >
        <div className="flex-1">
          <div
            className={`pt-6 pb-4 flex items-center justify-between relative  ${collapsed ? "px-2 justify-center" : "px-5"}`}
          >
            <Image
              src={collapsed ? logosm : biglogo}
              width={193}
              height={36}
              alt="CohortGenie"
              className={`h-[29px]! ${collapsed ? "w-8" : "w-auto"}`}
            />
            <div
              className={`cursor-pointer  ${collapsed ? "absolute top-0 right-0 hidden" : ""}`}
              onClick={() => setCollapsed((prev: any) => !prev)}
            >
              <MenuIcon color="#6B7280" />
            </div>
          </div>
          <ul>
            {items.map((item, i) => (
              <MenuItem item={item} key={i} collapsed={collapsed} />
            ))}
          </ul>
        </div>

        {/* <SidebarMenu>
          {items2.map((item, i) => (
            <MenuItem item={item} key={i} collapsed={collapsed} />
          ))}
        </SidebarMenu> */}
      </aside>
    </TooltipProvider>
  );
}
