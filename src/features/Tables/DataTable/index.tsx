import { useMemo, useEffect, useState } from "react";
import { useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel, Header, flexRender } from "@tanstack/react-table";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import GVBox from "components/GVBox";
import GVTypography from "components/GVTypography";
import GVInput from "components/GVInput";
import GVPagination from "components/GVPagination";

import DataTableHeadCell, { DataTableHeadCellSortedType } from "features/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "features/Tables/DataTable/DataTableBodyCell";
import { ExtraColorKeys, GradientKeys } from "assets/theme/base/colors";

// function debounce(fn: any, delay: number) {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, ...args), delay);
//   }
// }

type TableStateType = {
  [x: string]: any;
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
};

type DataTableEntriesPerPageType = {
  defaultValue: number;
  entries: string[];
}

type DataTableTableType = {
  columns: any[];
  rows: any[];
}

type DataTablePaginationType = {
  variant?: string;
  color?: string;
}

export type DataTableProps = {
  entriesPerPage?: DataTableEntriesPerPageType;
  canSearch?: string;
  showTotalEntries?: string | boolean;
  table: DataTableTableType;
  pagination?: DataTablePaginationType;
  isSorted?: string | boolean;
  noEndBorder?: string | boolean;
};

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
}: DataTableProps) {
  const defaultValue = entriesPerPage?.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage?.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useReactTable<TableStateType>(
    { 
      columns, 
      data,
      getCoreRowModel: getCoreRowModel(), 
      getPaginationRowModel: getPaginationRowModel(), 
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
    },
  );

  const {
    setPageSize,
    getPageOptions,
    setPageIndex,
    getState,
    firstPage,
    getRowCount,
    nextPage,
    previousPage,
    getCanNextPage,
    getCanPreviousPage,
    getRowModel,
    getHeaderGroups,
  } = tableInstance;

  const { pageIndex, pageSize, globalFilter } = (getState() as any);

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: number) => setPageSize(value);

  // Render the paginations
  const renderPagination = getPageOptions().map((option: number) => (
    <GVPagination
      item
      key={option}
      onClick={() => setPageIndex(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </GVPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }: any) =>
    value > getPageOptions().length || value < 0 ? firstPage() : setPageIndex(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = getPageOptions().map((option: number) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }: any) => setPageIndex(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  // const onSearchChange = debounce((value) => {
  //   setGlobalFilter(value || undefined);
  // }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (header: Header<TableStateType, unknown>) => {
    let sortedValue;
    
    if (isSorted && header.column.getCanSort()) {
      sortedValue = header.column.getNextSortingOrder();
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === getPageOptions().length - 1) {
    entriesEnd = getRowCount();
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch ? (
        <GVBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <GVBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <GVInput {...params} />}
              />
              <GVTypography variant="caption" color={"secondary" as GradientKeys & ExtraColorKeys}>
                &nbsp;&nbsp;entries per page
              </GVTypography>
            </GVBox>
          )}
          {canSearch && (
            <GVBox width="12rem" ml="auto">
              <GVInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  // onSearchChange(currentTarget.value);
                }}
              />
            </GVBox>
          )}
        </GVBox>
      ) : null}
      <Table>
        <GVBox component="thead">
          {getHeaderGroups().map((headerGroup) => (
            <TableRow>
              {headerGroup.headers.map((haeder) => (
                <DataTableHeadCell
                  width={haeder.column.getSize() ? haeder.column.getSize() : "auto"}
                  sorted={setSortedValue(haeder)}
                  id={haeder.id}
                >
                  {flexRender(
                    haeder.column.columnDef.header,
                    haeder.getContext(),
                  )}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </GVBox>
        <TableBody>
          {getRowModel().rows
            .map((row, key) => {
              return (
                <TableRow>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <DataTableBodyCell 
                        noBorder={noEndBorder && getRowModel().rows.length - 1 === key}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </DataTableBodyCell>
                    );
                  })}
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

      <GVBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && getPageOptions().length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <GVBox mb={{ xs: 3, sm: 0 }}>
            <GVTypography variant="button" color={"secondary" as GradientKeys & ExtraColorKeys} fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {getRowModel().rows.length} entries
            </GVTypography>
          </GVBox>
        )}
        {getPageOptions().length > 1 && (
          <GVPagination
            variant={pagination?.variant ? pagination.variant : "gradient"}
            color={pagination?.color ? pagination.color : "info"}
          >
            {getCanPreviousPage() && (
              <GVPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </GVPagination>
            )}
            {renderPagination.length > 6 ? (
              <GVBox width="5rem" mx={1}>
                <GVInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(e) => {
                    handleInputPagination(e); handleInputPaginationValue(e);
                  }}
                />
              </GVBox>
            ) : (
              renderPagination
            )}
            {getCanNextPage() && (
              <GVPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </GVPagination>
            )}
          </GVPagination>
        )}
      </GVBox>
    </TableContainer>
  );
}

export default DataTable;
