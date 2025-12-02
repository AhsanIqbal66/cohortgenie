// TablesToolTip.tsx

const TablesToolTip = ({ value, cohort, month, type }: any) => {
  if (!value) return null;

  return (
    <div className="absolute hidden group-hover:flex flex-col bg-white text-primary-text text-xs -top-[85px] left-1/2 -translate-x-1/2 z-50 whitespace-nowrap py-2.5 px-5 rounded-xl shadow-[0_6px_25px_0_rgba(0,0,0,0.09)] space-y-1">
      <span>
        <b>Cohort:</b> {cohort}
      </span>
      <span>
        <b>{type}:</b> {month}
      </span>
      <span className="text-[#9B6EEE]">
        <b>Retention:</b> {value}%
      </span>
    </div>
  );
};

export default TablesToolTip;
