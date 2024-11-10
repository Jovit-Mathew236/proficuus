"use client";

import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  CaretSortIcon,
  ChevronDownIcon,
  // DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Participant } from "../../dashboard/participents/participants";
import { useUser } from "@/lib/context/userContext";

export function CollegeData() {
  const tableRef = useRef(null);
  const { userData, error, loading } = useUser();

  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Participant>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "collage",
      header: () => <div>Collage</div>,
      cell: ({ row }) => <div>{row.getValue("collage")}</div>,
    },
    {
      accessorKey: "year",
      header: () => <div>Year</div>,
      cell: ({ row }) => <div>{row.getValue("year")}</div>,
    },
    {
      accessorKey: "zone",
      header: () => <div>Zone</div>,
      cell: ({ row }) => <div>{row.getValue("zone")}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div>Phone</div>,
      cell: ({ row }) => (
        <div>
          <a href={`tel:${row.getValue("phone")}`}>{row.getValue("phone")}</a>
        </div>
      ),
    },
    {
      accessorKey: "alternativephone",
      header: () => <div>Alternative Phone</div>,
      cell: ({ row }) => <div>{row.getValue("alternativephone")}</div>,
    },
    {
      accessorKey: "expectation",
      header: () => <div>Expectation</div>,
      cell: ({ row }) => <div>{row.getValue("expectation")}</div>,
    },
    {
      accessorKey: "experience",
      header: () => <div>Experience</div>,
      cell: ({ row }) => <div>{row.getValue("experience")}</div>,
    },
  ];

  // Fetch participant data
  React.useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("/api/profile/collage-wise-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: userData?.uid,
            email: userData?.email,
            collegeName: userData?.collage,
          }),
        });

        if (!response.ok) {
          // Check if response is not okay (status not in the range 200-299)
          throw new Error("Failed to fetch participants.");
        }

        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchParticipants();
  }, [userData?.collage, userData?.uid]);

  const table = useReactTable({
    data: participants,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: Math.ceil(participants.length / 10),
    manualPagination: true,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col p-5 md:p-10 md:rounded-tl-2xl border border-primary-foreground bg-background flex-1 w-full h-full gap-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DownloadTableExcel
          filename="Proficuus Participants"
          sheet="Participants"
          currentTableRef={tableRef.current}
        >
          <Button variant="secondary" className="mx-4">
            Export Excel
          </Button>
        </DownloadTableExcel>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`rounded-md border max-w-[90vw] sm:w-full`}>
        <Table ref={tableRef}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
