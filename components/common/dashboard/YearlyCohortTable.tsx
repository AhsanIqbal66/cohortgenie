import { Skeleton } from "@/components/ui/skeleton";

const getColor = (value: any): string => {
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
const years = ["Y1", "Y2", "Y3"];

const labels = ["2023", "2024", "2025"];

export default function YearlyCohortTable({ matrix, labels, loading }: any) {
  const alignedMatrix = matrix?.map((row: any, rIndex: number) => {
    return row.slice(rIndex);
  });

  const yearHeaders = years.slice(0, alignedMatrix?.[0]?.length || 0);
  const numDataColumns = yearHeaders.length || 0;
  const gridTemplateStyle = {
    gridTemplateColumns: `minmax(80px, 1fr) repeat(${numDataColumns}, minmax(80px, 1fr))`,
  };

  return (
    <div className="w-full overflow-auto">
      {loading ? (
        <Skeleton className="h-[235px]" />
      ) : (
        <>
          <div
            className="gap-2 mb-3 px-2 bg-[#F9FAFB] rounded-md"
            style={gridTemplateStyle}
          >
            <div className="rounded-md py-2.5 px-2 text-center text-sm grid-flow-col">
              Cohort
            </div>
            {yearHeaders.map((m) => (
              <div
                key={m}
                className="rounded-md py-2.5 px-2 text-center text-sm"
              >
                {m}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {alignedMatrix?.map((row: any, rIndex: any) => (
              <div key={rIndex} className="gap-2" style={gridTemplateStyle}>
                <div className="text-xs md:text-sm flex items-center justify-center text-primary-text">
                  {labels[rIndex]}
                </div>
                {row.map((value: any, cIndex: any) => (
                  <div
                    key={cIndex}
                    className={`rounded-md py-2.5 px-2 text-center text-xs md:text-sm ${getColor(value)}`}
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
  );
}
