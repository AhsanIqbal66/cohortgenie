import { Skeleton } from "@/components/ui/skeleton";

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
const labels = ["Q1", "Q2", "Q3", "Q4"];

export default function QuartlyCohortTable({ labels, matrix, loading }: any) {
  console.log("🚀 ~ QuartlyCohortTable ~ labels:", labels);
  console.log("🚀 ~ QuartlyCohortTable ~ quarterMatrix:", matrix);
  // const filteredMatrix = quarterMatrix
  //   ?.map((row: any) => {
  //     const startIndex = row?.findIndex((v: any) => v === 100);
  //     return startIndex === -1 ? [] : row?.slice(startIndex);
  //   })
  //   .filter((row: any) => row?.length > 0);
  const alignedMatrix =
    matrix?.map((row: any, rIndex: number) => {
      // rIndex = row number
      // Slice row so that values start from column rIndex
      return row?.slice(rIndex);
    }) || [];
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[400px] p-1">
        {loading ? (
          <Skeleton className="h-[235px]" />
        ) : (
          <>
            <div className="grid grid-cols-5 gap-2 mb-3 px-2 bg-[#F9FAFB] rounded-md">
              <div className="rounded-md py-2.5 px-2 text-center text-xs md:text-sm ">
                Cohort
              </div>
              {labels?.map((m: any) => (
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
                <div key={rIndex} className="grid grid-cols-5 gap-2">
                  <div className="text-xs md:text-sm flex items-center justify-center text-primary-text">
                    {labels[rIndex]}
                  </div>

                  {row.map((value: any, cIndex: any) => (
                    <div
                      key={cIndex}
                      className={`rounded-md py-2.5 px-2 text-center text-xs md:text-sm   ${getColor(value)}`}
                    >
                      {value !== 0 ? `${value}%` : ""}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
