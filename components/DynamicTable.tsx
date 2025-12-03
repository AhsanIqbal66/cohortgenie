"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  FileText,
  Loader2,
  SearchIcon,
  SendIcon,
  ShoppingBasket,
} from "lucide-react";
import { Switch } from "./ui/switch";
export interface TableColumn {
  id: string;
  header: string | (() => React.ReactNode);
  accessorKey?: string;
  accessorFn?: (row: any) => any;
  sortable?: boolean;
  rankable?: boolean;
  exportable?: boolean;
  toggle?: boolean;
  clickable?: boolean;
  size?: string | number;
  minSize?: string | number;
  maxSize?: string | number;
  headerClassName?: string;
  cellClassName?: string;
}

export interface TableData {
  id: string;
  [key: string]: any;
}

interface DynamicTableProps {
  columns: TableColumn[];
  data: TableData[];
  isLoading?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onUpdateRanking?: (id: string, newRanking: number) => Promise<void>;
  successMessage?: string | null;
  exportable?: boolean;
  tableName?: string;
  deleteData?: string;
  pagesData?: string | null;
  search?: boolean | null;
  clickable?: boolean | null;
  pagination?: boolean | null;
  showEntries?: boolean | null;
  view?: boolean | null;
  send?: boolean | null;
  totalPages?: any;
  totalDocumentCount?: any;
  currentActivePage?: any;
  ButtonText?: any;
  editRow?: any;
  // Update / Delete row Function
  getClickabledata?: (rowData: any) => void; // When a row is clicked
  onRowDelete?: (rowData: number) => void;
  onRowDelete2?: (rowData: any) => void; //accpecting mutiple values
  onRowEdit?: (rowData: any) => void;
  onRowView?: (rowData: any) => void; // When a row is clicked
  onRowSwitch?: (rowData: any, value?: any) => void; // When a row is clicked
  onRowSend?: (rowData: any) => void;
  ButtonClick?: (rowData: any) => void;
  getCurrentPageData?: (rowData: any) => void;
  onTableExportData?: (rowData: any) => void;
  getSearchableText?: (rowData: any) => void;
  onViewDetail?: (rowData: any) => void;
  filtersHeaderClassName?: any;
  // onSortChange?: (columnKey: string, direction: "asc" | "desc") => void; // Sorting callback
  // onPageChange?: (newPage: number, pageSize: number) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  pagination = false,
  isLoading = false,
  showEntries = false,
  totalPages = 1,
  currentActivePage = 1,
  defaultPageSize = 10,
  totalDocumentCount = 1,
  pageSizeOptions = [10, 25, 50, 100],
  onUpdateRanking,
  successMessage = null,
  exportable = false,
  pagesData = null,
  search = false,
  clickable = false,
  tableName = "Table",
  view = false,
  send = false,
  editRow = true,
  onRowSend,
  onRowDelete,
  onRowDelete2,
  onRowEdit,
  ButtonClick,
  onRowView,
  onRowSwitch,
  getClickabledata,
  getCurrentPageData,
  onTableExportData,
  getSearchableText,
  onViewDetail,
  filtersHeaderClassName,
  ButtonText,
}) => {
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TableData[]>(data);
  const [rankingInProgress, setRankingInProgress] = useState<
    Record<string, boolean>
  >({});
  const [notification, setNotification] = useState<string | null>(
    successMessage
  );
  const getSizeStyles = (column: TableColumn) => {
    const toCssSize = (
      value: string | number | undefined
    ): string | undefined => {
      if (typeof value === "number") return `${value}px`;
      return value;
    };

    const styles: React.CSSProperties = {};
    if (column.size) styles.width = toCssSize(column.size);
    if (column.minSize) styles.minWidth = toCssSize(column.minSize);
    if (column.maxSize) styles.maxWidth = toCssSize(column.maxSize);

    return styles;
  };

  useEffect(() => {
    // Apply filtering
    if (!getSearchableText) {
      const filtered = data.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      // Apply sorting
      let sorted = [...filtered];
      if (sortColumn) {
        sorted.sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];

          if (aValue === bValue) return 0;

          const comparison = aValue > bValue ? 1 : -1;
          return sortDirection === "desc" ? comparison * -1 : comparison;
        });
      }

      setFilteredData(sorted);
      setCurrentPage(Number(currentActivePage) || 1);
    } // Reset to first page when filtering
  }, [
    data,
    searchTerm,
    sortColumn,
    sortDirection,
    currentActivePage,
    getSearchableText,
  ]);

  useEffect(() => {
    if (successMessage) {
      setNotification(successMessage);
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * 20;
  // const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  const paginatedData = filteredData;

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const handleRankingChange = async (id: string, newRanking: number) => {
    if (onUpdateRanking) {
      setRankingInProgress({ ...rankingInProgress, [id]: true });
      try {
        await onUpdateRanking(id, newRanking);
      } catch (error) {
        console.error("Error updating ranking:", error);
      } finally {
        setRankingInProgress({ ...rankingInProgress, [id]: false });
      }
    }
  };

  const exportToCsv = () => {
    const exportColumns = columns.filter((col) => col.exportable !== false);

    // Create CSV header
    const headers = exportColumns.map((col) => col.header).join(",");

    // Create CSV rows
    const rows = filteredData.map((row) =>
      exportColumns
        .map((col) => {
          const value = col.accessorKey ? row[col.accessorKey] : undefined;
          // Escape commas and quotes in values
          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : String(value);
        })
        .join(",")
    );

    // Combine header and rows
    const csv = [headers, ...rows].join("\n");

    // Download CSV file
    downloadFile(
      csv,
      `${tableName.toLowerCase().replace(/\s+/g, "-")}.csv`,
      "text/csv"
    );
  };

  const exportToExcel = () => {
    const exportColumns = columns.filter((col) => col.exportable !== false);

    // Create CSV header (Excel can import CSV)
    const headers = exportColumns.map((col) => col.header).join(",");

    // Create CSV rows
    const rows = filteredData.map((row) =>
      exportColumns
        .map((col) => {
          const value = col.accessorKey ? row[col.accessorKey] : undefined;
          // Escape commas and quotes in values
          return typeof value === "string"
            ? `"${value.replace(/"/g, '""')}"`
            : String(value);
        })
        .join(",")
    );

    // Combine header and rows
    const csv = [headers, ...rows].join("\n");

    // Download Excel file (actually CSV, but with .xlsx extension)
    downloadFile(
      csv,
      `${tableName.toLowerCase().replace(/\s+/g, "-")}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  };

  const exportToPdf = () => {
    // Create a window object for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to export PDF");
      return;
    }

    const exportColumns = columns.filter((col) => col.exportable !== false);

    // Create HTML content for PDF
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${tableName}</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          h1 { text-align: center; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>${tableName}</h1>
        <table>
          <thead>
            <tr>
              ${exportColumns.map((col) => `<th>${col.header}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
    `;

    // Add rows to HTML
    filteredData.forEach((row) => {
      htmlContent += "<tr>";
      exportColumns.forEach((col) => {
        htmlContent += `<td>${col.accessorKey ? row[col.accessorKey] : ""}</td>`;
      });
      htmlContent += "</tr>";
    });

    // Complete HTML
    htmlContent += `
          </tbody>
        </table>
        <div class="footer">
          Generated on ${new Date().toLocaleString()}
        </div>
        <script>
          // Automatically print when loaded
          window.onload = function() {
            window.print();
            // Close after print dialog is closed or canceled
            window.onfocus = function() { setTimeout(function() { window.close(); }, 500); };
          };
        </script>
      </body>
      </html>
    `;

    // Write to the new window and trigger print
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const downloadFile = (
    content: string,
    fileName: string,
    contentType: string
  ) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Add handler functions
  const handleView = (id: string) => {
    console.log("View item:", id);
    // Add your view logic here
    if (onRowView) {
      onRowView(id);
    }
  };
  const handleSend = (id: any) => {
    console.log("View item:", id);
    // Add your view logic here
    if (onRowSend) {
      onRowSend(id);
    }
  };
  const handleSwitch = (value: any, id: any) => {
    console.log("View item:", id, value);
    // Add your view logic here
    if (onRowSwitch) {
      onRowSwitch(id, value);
    }
  };

  const handleEdit = (id: any) => {
    // console.log("Edit item:", id);
    if (onRowEdit) {
      onRowEdit(id);
    }
    // Add your edit logic here
  };

  const handleDelete = (id: any) => {
    console.log("Delete item:", id);
    if (onRowDelete) {
      onRowDelete(id);
    }
  };
  const handleDelete2 = (values: any) => {
    console.log("Delete item:", values);
    if (onRowDelete2) {
      onRowDelete2(values);
    }
  };
  const handleRowClick = (row: any) => {
    if (getClickabledata) {
      getClickabledata(row);
    }
  };

  const handleExportData = (row: any) => {
    if (onTableExportData) {
      onTableExportData(row);
    }
  };

  const handleViewDetailData = (row: any) => {
    if (onViewDetail) {
      onViewDetail(row);
    }
  };

  //

  return (
    <div className="w-full ">
      {/* {notification && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertDescription>{notification}</AlertDescription>
          <button
            className="absolute right-2 top-2 text-green-500"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </Alert>
      )} */}
      {/* <div className="flex items-center gap-2">
          <span className='text-sm text-[#11255a] font-semibold'>Show:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value: any) => setPageSize(Number(value))}

          >
            <SelectTrigger className="w-[70px] cursor-pointer border-none bg-[#F4F4F4] text-sm text-[#11255a] font-semibold">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()} className='cursor-pointer'>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className='text-sm text-[#11255a] font-semibold'>Entries</span>
        </div> */}
      {/* <div className={`flex justify-between items-center mb-5 ${filtersHeaderClassName}`}>

        {exportable && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-2 h-[38px]  sm:h-[42px] px-3 gap-x-1">
                <DownloadIcon className="h-4 w-4 mr-1" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToCsv}>
                <FaFileCsv className="h-4 w-4 mr-2" /> CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPdf}>
                <FileText className="h-4 w-4 mr-2" /> PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData('CSV')}>
                <ArrowDown className="h-4 w-4 mr-2" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>handleExportData('PDF')}>
                <FileText className="h-4 w-4 mr-2" /> PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {search && <div className="flex items-center gap-2 w-full max-w-[430px] py-[5px] px-3.5 bg-[#F4F4F4] rounded-lg h-[38px] sm:h-[46px]">
          <SearchIcon className="w-5 h-5 text-dark-500" />
          <Input
            className=" placeholder:text-[#7C888E] font-popins border-none text-sm placeholder:text-sm bg-[#F4F4F4] shadow-none focus:outline-none focus:shadow-[0] "
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>}
      </div> */}

      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={`font-medium text-primary-text text-sm bg-[#EDF7FF] px-2 lg:p-4`}
                  style={getSizeStyles(column)}
                >
                  <div
                    className={`flex items-center gap-1 ${column.headerClassName}`}
                  >
                    {typeof column.header === "function"
                      ? column.header()
                      : column.header}
                    {column.sortable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-4 cursor-pointer"
                        onClick={() =>
                          column.accessorKey && handleSort(column.accessorKey)
                        }
                      >
                        <ArrowUpDown size={14} />
                      </Button>
                    )}
                  </div>
                </TableHead>
              ))}
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8"
                >
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 font-semibold text-[#155DFC]"
                >
                  No Data Available in Table
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={clickable ? () => handleRowClick(row) : undefined}
                  className={`even:bg-[#F9FBFC] odd:bg-white ${clickable ? "cursor-pointer  hover:bg-gray-100" : ""}`}
                >
                  {columns.map((column) => {
                    // Special handling for the actions column
                    if (column.id === "actions") {
                      return (
                        <TableCell
                          key={`${row.id}-${column.id}` + 0.25}
                          className={`text-right text-[#202224] text-sm ${column.cellClassName}`}
                          style={getSizeStyles(column)}
                        >
                          {/* <Button size="icon" variant="ghost"  onClick={() => handleView(row.id)} className="h-8 w-8">
                          <Eye className="h-4 w-4 mr-2" /> 
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(row)} className="h-8 w-8">
                        <Edit className="h-4 w-4 mr-2" /> 
                        </Button>
                        <Button size="icon" variant="ghost"  onClick={() => handleDelete(row?.id)} className="h-8 w-8">
                        <Trash className="h-4 w-4 mr-2" />  */}

                          {/* </Button> */}
                          {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild className='cursor-pointer'>
                              <EllipsisVertical className="h-4 w-4 ml-1" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {(view || onRowView) && (
                                <DropdownMenuItem
                                  onClick={() => handleView(row.id)}
                                >
                                  <Eye className="h-4 w-4 mr-2" /> View
                                </DropdownMenuItem>
                              )}


                              {
                                send && <DropdownMenuItem onClick={() => handleSend(row)} className='cursor-pointer'>
                                  <BsSendArrowUp className="h-4 w-4 mr-2" />
                                  Send
                                </DropdownMenuItem>
                              }


                              <DropdownMenuItem onClick={() => handleEdit(row)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>

                            

                              {onRowDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDelete(row?.id)}
                                >
                                  <Trash className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                          <div
                            className={`flex items-center gap-1 flex-wrap ${column.cellClassName}`}
                          >
                            {(view || onRowView) && (
                              <div
                                onClick={() => handleView(row.id)}
                                className="cursor-pointer"
                              >
                                <EyeIcon className={"w-6 h-6 text-dark-500"} />
                              </div>
                            )}

                            {send && (
                              <div
                                onClick={() => handleSend(row)}
                                className="cursor-pointer p-0.5"
                              >
                                <SendIcon className={"w-6 h-6"} />
                              </div>
                            )}
                            {onRowEdit && editRow && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(row);
                                }}
                                className="cursor-pointer"
                              >
                                <EditIcon className={"w-6 h-6 text-dark-500"} />
                              </div>
                            )}
                            {onRowDelete && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(row?.id);
                                }}
                                className="cursor-pointer"
                              >
                                <DeleteIcon className="w-6 h-6 text-[#C03221]" />
                              </div>
                            )}
                            {onRowDelete2 && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete2(row);
                                }}
                                className="cursor-pointer"
                              >
                                <DeleteIcon className="w-6 h-6 text-[#C03221]" />
                              </div>
                            )}
                            {onViewDetail && (
                              <div
                                onClick={() => handleViewDetailData(row)}
                                className="cursor-pointer"
                              >
                                <FileText className="w-6 h-6 text-dark-500" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                      );
                    }

                    if (column.id === "actionButton") {
                      return (
                        <TableCell
                          key={`${row.id}-${column.id}`}
                          className={`text-left text-[#202224] text-sm ${column.cellClassName}`}
                          style={getSizeStyles(column)}
                        >
                          {/* {ButtonText&&ButtonClick&&<Button onClick={() => ButtonClick(row)} variant={'modal'}>{ButtonText}</Button>} */}
                          {ButtonClick && (
                            <div
                              onClick={() => ButtonClick(row)}
                              className="cursor-pointer"
                            >
                              <ShoppingBasket />
                            </div>
                          )}
                        </TableCell>
                      );
                    }

                    // Normal column rendering
                    return (
                      // <TableCell key={`${row.id}-${column.id}`}
                      //   className="max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                      //   {column.rankable ? (
                      //     <Input
                      //       type="number"
                      //       value={column.accessorKey ? row[column.accessorKey] || '' : ''}
                      //       onChange={(e) => {
                      //         const newValue = parseInt(e.target.value);
                      //         if (!isNaN(newValue)) {
                      //           handleRankingChange(row.id, newValue);
                      //         }
                      //       }}
                      //       className="w-16"
                      //       disabled={rankingInProgress[row.id]}
                      //     />
                      //   ) :
                      //     column.toggle ?
                      //       <Switch
                      //         checked={column.accessorKey ? row[column.accessorKey] : false}
                      //         onCheckedChange={() => {
                      //           if (column.accessorKey) {
                      //             handleSwitch(row[column.accessorKey], row.id);
                      //           }
                      //         }}

                      //       />
                      //       :
                      //       (
                      //         column.accessorKey ? row[column.accessorKey] : null
                      //       )}
                      // </TableCell>
                      // In the DynamicTable component, modify the cell rendering part:
                      <TableCell
                        key={`${row.id}-${column.id}` + 0.25}
                        className={`max-w-[150px] truncate whitespace-nowrap overflow-hidden text-[#202224] text-sm px-3 lg:px-4 py-3 lg:py-4 ${column.cellClassName}`}
                        style={getSizeStyles(column)}
                      >
                        {column.rankable ? (
                          <Input
                            type="number"
                            value={
                              column.accessorKey
                                ? row[column.accessorKey] || ""
                                : ""
                            }
                            onChange={(e) => {
                              const newValue = parseInt(e.target.value);
                              if (!isNaN(newValue)) {
                                handleRankingChange(row.id, newValue);
                              }
                            }}
                            className="w-16"
                            disabled={rankingInProgress[row.id]}
                          />
                        ) : column.toggle ? (
                          <Switch
                            checked={
                              column.accessorKey
                                ? row[column.accessorKey]
                                : false
                            }
                            onCheckedChange={() => {
                              if (column.accessorKey) {
                                handleSwitch(row[column.accessorKey], row);
                              }
                            }}
                          />
                        ) : // This is the key change - use accessorFn if it exists, otherwise fall back to accessorKey
                        column.accessorFn ? (
                          column.accessorFn(row)
                        ) : column.accessorKey ? (
                          row[column.accessorKey]
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="whitespace-nowrap">
            {/* Showing {startIndex + 1} to {Math.min(startIndex + 20, filteredData.length)} from {totalDocumentCount} */}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  size={"default"}
                  onClick={() => {
                    getCurrentPageData?.(Math.max(1, currentPage - 1));
                    setCurrentPage(Math.max(1, currentPage - 1));
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      size={"default"}
                      onClick={() => {
                        getCurrentPageData?.(pageNum);
                        setCurrentPage(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  size={"default"}
                  onClick={() => {
                    {
                      getCurrentPageData?.(
                        Math.min(totalPages, currentPage + 1)
                      );
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                    }
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
