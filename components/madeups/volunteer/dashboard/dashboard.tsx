"use client";

import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export type Volunteer = {
  email: string;
  name: string;
  collage: string;
  year: number;
  zone: string;
  phone: string;
  experience: string;
  alternativephone: string;
  meeting_availability: string;
  program_availability: string;
  ministry: string;
  //   imageUrl?: string;
};

const columns: ColumnDef<Volunteer>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
    accessorKey: "collage",
    header: () => <div>Collage</div>,
    cell: ({ row }) => <div>{row.getValue("collage")}</div>,
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
    accessorKey: "ministry",
    header: () => <div>Ministry</div>,
    cell: ({ row }) => <div>{row.getValue("ministry")}</div>,
  },
  {
    accessorKey: "experience",
    header: () => <div>Experience</div>,
    cell: ({ row }) => <div>{row.getValue("experience")}</div>,
  },
  {
    accessorKey: "meeting_availability",
    header: () => <div>Meeting Availability</div>,
    cell: ({ row }) => <div>{row.getValue("meeting_availability")}</div>,
  },
  {
    accessorKey: "program_availability",
    header: () => <div>Program Availability</div>,
    cell: ({ row }) => <div>{row.getValue("program_availability")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const volunteer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(volunteer.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                window.location.href = `https://wa.me/${volunteer.phone}`;
              }}
            >
              Whatsapp Msg
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function VolunteerDashboard() {
  const tableRef = useRef(null);
  const [volunteers, setVolunteers] = React.useState<Volunteer[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Fetch volunteer data
  React.useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/registration/dashboard", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers.");
        }
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVolunteers();
  }, []);
  // console.log("volunteers", volunteers);

  const table = useReactTable({
    data: volunteers,
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
    pageCount: Math.ceil(volunteers.length / 10), // Assuming 10 as page size
    manualPagination: true, // Set to false if you want to manage pagination manually
  });

  return (
    <div className="w-full overflow-x-auto">
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
          filename="Proficuus Volunteers"
          sheet="Volunteers"
          currentTableRef={tableRef.current}
        >
          <Button variant={"secondary"} className="mx-4">
            {" "}
            Export excel{" "}
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
      <div className="rounded-md border max-w-[90vw] sm:max-w-[95vw] lg:max-w-[98vw] xl:max-w-none">
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
