const MetricCard = ({
  icon: Icon,
  primaryText,
  secondaryText,
  loading,
  chartComponent: Chart,
}: any) => (
  <div className="gap-y-2.5 flex items-center justify-between gap-x-4 flex-wrap p-3 py-5 sm:py-5 sm:p-3.5 xl:p-5 2xl:p-7 border border-[#E5E7EB] rounded-xl bg-white">
    <div className="flex items-center gap-x-2 2xl:gap-x-2.5">
      <div
        className={`w-10 h-10 2xl:w-[50px] 2xl:h-[50px] flex items-center justify-center rounded-full bg-[#F2F2F2] shrink-0`}
      >
        <Icon color="#6B7280" />
      </div>
      <div>
        <p className="text-[11px] 2xl:text-xs text-secondary-text">
          {loading ? "---" : (secondaryText ?? "N/A")}
        </p>
        <h3 className="text-base lg:text-[15px] 2xl:text-xl font-semibold text-primary-text mt-0.5">
          {loading ? "---" : (primaryText ?? "N/A")}
        </h3>
      </div>
    </div>
    <div className="md:w-20 2xl:w-[100px] flex justify-end ml-auto">
      {Chart}
    </div>
  </div>
);
export default MetricCard;
