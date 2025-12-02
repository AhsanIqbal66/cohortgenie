// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// const formatDate = (date?: Date) => {
//   if (!date) return null;
//   return `${date.getMonth() + 1}-${date.getFullYear()}`;
// };
// const ExtraClaneder = () => {
//   const [dropdown, setDropdown] = useState();
//   const [filterType, setFilterType] = useState("date");

//   const [open, setOpen] = useState(false);

//   const [period1, setPeriod1] = useState<Date | undefined>(new Date());
//   const [period2, setPeriod2] = useState<Date | undefined>(new Date());

//   const [label, setLabel] = useState("Select Date");
//   const handleApply = () => {
//     // 🔹 LABEL WILL ALWAYS SHOW DATE RANGE
//     if (period1 && period2) {
//       setLabel(`${period1.toDateString()} → ${period2.toDateString()}`);
//     }

//     // 🔹 Now prepare values for submission based on filter type
//     let payload = {};

//     if (filterType === "date") {
//       payload = {
//         type: "date",
//         from: formatDate(period1),
//         to: formatDate(period2),
//       };
//     }

//     if (filterType === "month") {
//       payload = {
//         type: "month",
//         month: period1?.getMonth() + 1,
//         year: period1?.getFullYear(),
//         formatted: `${period1?.getMonth()! + 1}-${period1?.getFullYear()}`,
//       };
//     }

//     if (filterType === "quarter") {
//       const q = Math.ceil(((period1?.getMonth() ?? 0) + 1) / 3);

//       payload = {
//         type: "quarter",
//         quarter: q,
//         year: period1?.getFullYear(),
//         formatted: `Q${q}-${period1?.getFullYear()}`,
//       };
//     }

//     if (filterType === "year") {
//       payload = {
//         type: "year",
//         year: period1?.getFullYear(),
//         formatted: `${period1?.getFullYear()}`,
//       };
//     }

//     console.log("🎯 FINAL SUBMIT PAYLOAD:", payload);
//   };
//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger className="border border-gray-200 px-3 py-2 rounded-md">
//         {label}
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="rounded-xl w-fit p-5">
//         <div className="flex items-center">
//           <Calendar
//             mode="single"
//             defaultMonth={period1}
//             selected={period1}
//             onSelect={setPeriod1}
//             captionLayout={dropdown}
//             className="rounded-lg"
//           />

//           <div className="w-px bg-gray-300 min-h-[250px] h-full mx-6"></div>

//           <Calendar
//             mode="single"
//             defaultMonth={period2}
//             selected={period2}
//             onSelect={setPeriod2}
//             captionLayout={dropdown}
//             className="rounded-lg"
//           />
//         </div>
//         <div className="flex justify-end mt-4 gap-3">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => {
//               setPeriod1(undefined);
//               setPeriod2(undefined);
//               setLabel("Select Date");
//               setOpen(false);
//             }}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="main"
//             size="sm"
//             onClick={() => {
//               handleApply();
//               setOpen(false);
//             }}
//           >
//             Apply
//           </Button>
//         </div>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default ExtraClaneder;
