import { Skeleton } from "../ui/skeleton";

const getColor = (value: any): string => {
  // Handle null, undefined, or zero values
  if (!value || value === 0) {
    return "bg-gray-100 text-gray-400";
  }
  if (value > 2000) {
    return "bg-[#5b3d93] text-white";
  }
  if (value > 1000 && value <= 2000) {
    return "bg-[#6b4ba7] text-white";
  }
  if (value > 500 && value <= 1000) {
    return "bg-[#7b57bd] text-white";
  }
  if (value > 100 && value <= 500) {
    return "bg-[#8d67d3] text-white";
  }
  if (value <= 100 && value > 80) {
    return "bg-[#9B6EEE] text-white";
  }
  if (value <= 80 && value > 70) {
    return "bg-[#AA84F1] text-white";
  }
  if (value <= 70 && value > 50) {
    return "bg-[#C9B1F6] text-white";
  }
  if (value <= 50 && value > 20) {
    return "bg-[#D9C8F9] text-white";
  }
  if (value <= 20 && value > 0) {
    return "bg-[#D9C8F9] text-primary-text";
  }
  return "bg-gray-100 text-gray-400";
};
const months = [
  "M1",
  "M2",
  "M3",
  "M4",
  "M5",
  "M6",
  "M7",
  "M8",
  "M9",
  "M10",
  "M11",
  "M12",
];

export default function MonthlyCohortTable({ matrix, labels, loading }: any) {
  // const filteredMatrix = monthsdata
  //   ?.map((row: any) => {
  //     const startIndex = row?.findIndex((v: any) => v === 100);
  //     return startIndex === -1 ? [] : row?.slice(startIndex);
  //   })
  //   .filter((row: any) => row?.length > 0);
  const alignedMatrix = matrix?.map((row: any, rIndex: number) => {
    return row.slice(rIndex);
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[870px] p-1">
        {loading ? (
          <Skeleton className="h-[600px]" />
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-13 gap-2 mb-3 px-2 bg-[#F9FAFB] rounded-md">
              <div className="rounded-md py-2.5 px-2 text-center text-xs md:text-sm ">
                Cohort
              </div>
              {months?.map((m) => (
                <div
                  key={m}
                  className="rounded-md py-2.5 px-2 text-center text-xs md:text-sm "
                >
                  {m}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {alignedMatrix?.map((row: any, rIndex: any) => (
                <div key={rIndex} className="grid grid-cols-13 gap-2">
                  <div className="text-xs md:text-sm flex items-center justify-center text-primary-text">
                    {labels[rIndex]}
                  </div>

                  {row?.map((value: any, cIndex: any) => (
                    <div
                      key={cIndex}
                      className={`rounded-md py-2.5 px-2 text-center text-xs md:text-sm min-h-10 ${getColor(value)}`}
                    >
                      {value !== 0 ? `${value}%` : ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
