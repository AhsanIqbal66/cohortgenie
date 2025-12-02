import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, quarters, yearsOnly } from "@/constants";
import { Button } from "../ui/button";
const FiltersSheet = ({
  open,
  setOpen,
  staticYears,
  staticQuarters,
  staticMonths,

  staticYears2,
  staticQuarters2,
  staticMonths2,

  filterType,
  setFilterType,
  selectedYear,
  setSelectedYear,
  selectedQuarter,
  setSelectedQuarter,
  selectedMonth,
  setSelectedMonth,
  selectedYear2,
  setSelectedYear2,
  selectedQuarter2,
  setSelectedQuarter2,
  selectedMonth2,
  setSelectedMonth2,
  handleSubmit,
}: any) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-[760px] rounded-2xl p-8 shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-2 sm:mb-4 xl:mb-6">
          <DialogTitle className="text-base md:text-lg xl:text-xl font-semibold text-primary-text">
            Compare Data by Applying Filters
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-secondary-text">
            Choose periods and filter types to compare analytics on the
            dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 lg:space-y-5 2xl:space-y-10 h-full">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h5 className="text-sm md:text-base font-semibold text-primary-text mb-4">
              Select Filter Type
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select Filter Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h5 className="text-sm md:text-base font-semibold text-primary-text mb-6">
              Period 1 (Base Comparison)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">
                  Select Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {staticYears?.map((year: any) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month */}
              {filterType === "month" && (
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">
                    Select Month
                  </label>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {staticMonths?.map((month: any) => (
                        <SelectItem key={month.value} value={month.id}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quarter */}
              {filterType === "quarter" && (
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">
                    Select Quarter
                  </label>
                  <Select
                    value={selectedQuarter}
                    onValueChange={setSelectedQuarter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Quarter" />
                    </SelectTrigger>
                    <SelectContent>
                      {staticQuarters?.map((quarter: any) => (
                        <SelectItem key={quarter.value} value={quarter.id}>
                          {quarter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h5 className="text-sm md:text-base font-semibold text-primary-text mb-6">
              Period 2 (Compare With)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">
                  Select Year
                </label>
                <Select value={selectedYear2} onValueChange={setSelectedYear2}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {staticYears2?.map((year: any) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month */}
              {filterType === "month" && (
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">
                    Select Month
                  </label>
                  <Select
                    value={selectedMonth2}
                    onValueChange={setSelectedMonth2}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {staticMonths2.map((month: any) => (
                        <SelectItem key={month.value} value={month.id}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quarter */}
              {filterType === "quarter" && (
                <div>
                  <label className="text-sm text-gray-600 mb-1.5 block">
                    Select Quarter
                  </label>
                  <Select
                    value={selectedQuarter2}
                    onValueChange={setSelectedQuarter2}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Quarter" />
                    </SelectTrigger>
                    <SelectContent>
                      {staticQuarters2.map((quarter: any) => (
                        <SelectItem key={quarter.value} value={quarter.id}>
                          {quarter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 mt-3.5 sm:mt-0">
            <Button onClick={() => setOpen(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant={"main"}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersSheet;
