"use client";

import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useSidebar } from "@/components/ui/sidebar";
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
// import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
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
import VolunteersActions, { FormSchema } from "./volunteers-actions";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

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
  isCoordinator?: boolean;
  // imageUrl?: string;
};

export function VolunteerDashboard() {
  const tableRef = useRef(null);
  const [volunteers, setVolunteers] = React.useState<Volunteer[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { toast } = useToast();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  async function onSubmit(
    data: z.infer<typeof FormSchema>,
    participant: Volunteer
  ) {
    if (data.pin == "122524") {
      try {
        const response = await fetch(
          "/api/profile/volunteers/update-is-coordinator",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collage: data.collage,
              email: participant.email,
              phone: participant.phone,
              isCoordinator: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update payment verification.");
        }

        setVolunteers((prevVolunteers) =>
          prevVolunteers.map((p) =>
            p.email === participant.email ? { ...p, isCoordinator: true } : p
          )
        );
        toast({
          title: "Success",
          description: "Coordinator Updated Successfully",
          variant: "default",
          duration: 2000,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      toast({
        title: "Wrong Password",
        description: "Please enter the correct OTP",
        variant: "destructive",
        duration: 2000,
      });
    }
  }

  const columns: ColumnDef<Volunteer>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    // },
    {
      accessorKey: "SI No",
      header: () => <div>SI No</div>,
      cell: ({ row }) => (
        <div className="min-w-9 text-center">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
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
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ministry
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("ministry")}</div>,
    },
    {
      accessorKey: "experience",
      header: () => <div>Experience</div>,
      cell: ({ row }) => <div>{row.getValue("experience")}</div>,
    },
    // {
    //   accessorKey: "meeting_availability",
    //   header: () => <div>Meeting Availability</div>,
    //   cell: ({ row }) => <div>{row.getValue("meeting_availability")}</div>,
    // },
    {
      accessorKey: "program_availability",
      header: () => <div>Program Availability</div>,
      cell: ({ row }) => <div>{row.getValue("program_availability")}</div>,
    },
    {
      accessorKey: "isCoordinator",
      header: () => <div>Is coordinator</div>,
      cell: ({ row }) => (
        <div>{row.getValue("isCoordinator") ? "Yes" : "No"}</div>
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const volunteer = row.original;
        return (
          <VolunteersActions
            volunteer={volunteer}
            onSubmit={onSubmit} // Pass the onSubmit function here
          />
        );
      },
    },
  ];

  // Fetch volunteer data
  React.useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/dashboard/proficuus24/volunteers", {
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

  const { state } = useSidebar();

  return (
    <div className="w-full h-full pb-4">
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
      <div
        className={`rounded-md h-full overflow-scroll border max-w-[90vw] sm:[95vw] ${
          state === "expanded"
            ? "lg:max-w-[calc(100vw-19rem)]"
            : "lg:max-w-[calc(100vw)]"
        } `}
      >
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
