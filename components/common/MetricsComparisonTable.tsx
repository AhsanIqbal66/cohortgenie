import { MoveDown, MoveUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
const ChangeIndicator = ({ value }: any) => {
  const isPositive = value >= 0;
  const colorClass = isPositive
    ? "text-green-600 bg-green-50"
    : "text-red-600 bg-red-50";
  const icon = isPositive ? <MoveUp size={14} /> : <MoveDown size={14} />;
  const formattedValue = `${isPositive ? "+" : ""}${Math.abs(value).toFixed(1)}%`;
  return (
    <div
      className={`flex w-fit items-center justify-end font-medium px-2 py-1 rounded-full gap-x-1 ${colorClass} sm:min-w-20]`}
    >
      {icon}
      <span className="text-sm">{formattedValue}</span>
    </div>
  );
};
const MetricsComparisonTable = ({
  data,
  period1Label = "Period 1",
  period2Label = "Period 2",
  isLoading,
}: any) => {
  console.log("🚀 ~ MetricsComparisonTable ~ data:", data);
  return (
    <div className="overflow-x-auto">
      {!data || data == null ? (
        <div className="h-[200px] flex items-center justify-center">
          <h2 className="text-xl">
            Choose periods and filter types to view comparison table.
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {isLoading ? (
            <Skeleton className="h-[300px] w-full mt-5" />
          ) : !data || data.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center">
              <h2 className="text-xl">
                Choose periods and filter types to view comparison table.
              </h2>
            </div>
          ) : (
            <table className="w-full text-sm text-left font-medium">
              <thead className="text-xs text-primary-text uppercase bg-[#F9FAFB]">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium w-1/4">
                    Metric
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium w-1/4">
                    {period1Label}
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium w-1/4">
                    {period2Label}
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium w-1/4">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((data: any, index: number) => (
                  <tr
                    key={data.metric}
                    className={`border-b border-[#E5E7EB] nth-last-1:border-b-0`}
                  >
                    <td className="px-6 py-4 font-medium text-primary-text whitespace-nowrap">
                      {data.metric}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#9B6EEE]">
                      {data.current}
                    </td>
                    <td className="px-6 py-4 text-secondary-text">
                      {data.previous}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChangeIndicator value={data.change} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricsComparisonTable;
