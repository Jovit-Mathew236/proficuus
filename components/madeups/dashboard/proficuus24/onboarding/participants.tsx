"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type Attendee = {
  name: string;
  email: string;
  phone: string;
  collage: string;
  zone: string;
  year: string;
  attendanceStatus: boolean;
  paymentStatus?: boolean;
  paymentAmount?: number;
  uid: string;
  remarks?: string;
};

const PaymentCell = ({
  attendee,
  onPaymentUpdate,
}: {
  attendee: Attendee;
  onPaymentUpdate: (attendee: Attendee, amount: number) => void;
}) => {
  const [localAmount, setLocalAmount] = useState<number | "">(
    attendee.paymentAmount || 800
  );
  const [isEditing, setIsEditing] = useState(false);

  if (attendee.paymentStatus && !isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="secondary" disabled>
          Paid ₹{attendee.paymentAmount}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              Edit Payment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={localAmount}
        onChange={(e) =>
          setLocalAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-24"
        placeholder="Amount"
      />
      <Button
        variant="default"
        onClick={() => {
          onPaymentUpdate(attendee, Number(localAmount) || 0);
          setIsEditing(false);
        }}
      >
        {isEditing ? "Update" : "Mark as Paid"}
      </Button>
      {isEditing && (
        <Button variant="ghost" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      )}
    </div>
  );
};

const RemarksCell = ({
  attendee,
  onRemarksUpdate,
}: {
  attendee: Attendee;
  onRemarksUpdate: (attendee: Attendee, remarks: string) => void;
}) => {
  const [remarks, setRemarks] = useState(attendee.remarks || "");

  return (
    <div className="flex items-center gap-2">
      <Input
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        className="w-40"
        placeholder="Add remarks"
      />
      <Button
        variant="outline"
        onClick={() => onRemarksUpdate(attendee, remarks)}
        size="sm"
      >
        Save
      </Button>
    </div>
  );
};

const ConfirmedParticipants = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [activeFilter, setActiveFilter] = useState<
    "name" | "collage" | "zone" | "year"
  >("name");
  const tableRef = useRef(null);

  const columns: ColumnDef<Attendee>[] = [
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
      header: () => <div>Email</div>,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
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
      accessorKey: "collage",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          College
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("collage")}</div>,
    },
    {
      accessorKey: "year",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("year")}</div>,
    },
    {
      accessorKey: "zone",
      header: () => <div>Zone</div>,
      cell: ({ row }) => <div>{row.getValue("zone")}</div>,
    },
    {
      accessorKey: "payment",
      header: () => <div>Payment</div>,
      cell: ({ row }) => (
        <div>
          {row.original.paymentAmount
            ? `₹${row.original.paymentAmount}`
            : "Not Paid"}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div>Actions</div>,
      cell: ({ row }) => (
        <PaymentCell
          attendee={row.original}
          onPaymentUpdate={handlePaymentStatus}
        />
      ),
    },
    {
      accessorKey: "remarks",
      header: () => <div>Remarks</div>,
      cell: ({ row }) => (
        <RemarksCell
          attendee={row.original}
          onRemarksUpdate={handleRemarksUpdate}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch("/api/onboard/participants/attendance");
        if (!response.ok) {
          throw new Error("Failed to fetch attendees");
        }
        const data = await response.json();
        setAttendees(data.attendees);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attendees: " + (err as Error).message);
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  const handlePaymentStatus = async (attendee: Attendee, amount: number) => {
    try {
      const response = await fetch("/api/onboard/participants/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: attendee.email,
          paymentStatus: true,
          paymentAmount: amount,
          remarks: attendee.remarks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment status");
      }

      setAttendees((prev) =>
        prev.map((p) =>
          p.email === attendee.email
            ? { ...p, paymentStatus: true, paymentAmount: amount }
            : p
        )
      );

      toast({
        title: "Success",
        description: "Payment status updated successfully",
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleRemarksUpdate = async (attendee: Attendee, remarks: string) => {
    try {
      const response = await fetch("/api/onboard/participants/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: attendee.email,
          paymentStatus: attendee.paymentStatus || false,
          paymentAmount: attendee.paymentAmount || 0,
          remarks: remarks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update remarks");
      }

      setAttendees((prev) =>
        prev.map((p) => (p.email === attendee.email ? { ...p, remarks } : p))
      );

      toast({
        title: "Success",
        description: "Remarks updated successfully",
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update remarks",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const table = useReactTable({
    data: attendees,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-full pb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button
            variant={activeFilter === "name" ? "secondary" : "outline"}
            onClick={() => {
              setActiveFilter("name");
              table.getColumn("collage")?.setFilterValue("");
              table.getColumn("zone")?.setFilterValue("");
              table.getColumn("year")?.setFilterValue("");
            }}
            className="flex-1 sm:flex-none"
          >
            By Name
          </Button>
          <Button
            variant={activeFilter === "collage" ? "secondary" : "outline"}
            onClick={() => {
              setActiveFilter("collage");
              table.getColumn("name")?.setFilterValue("");
              table.getColumn("zone")?.setFilterValue("");
              table.getColumn("year")?.setFilterValue("");
            }}
            className="flex-1 sm:flex-none"
          >
            By College
          </Button>
          <Button
            variant={activeFilter === "year" ? "secondary" : "outline"}
            onClick={() => {
              setActiveFilter("year");
              table.getColumn("name")?.setFilterValue("");
              table.getColumn("collage")?.setFilterValue("");
              table.getColumn("zone")?.setFilterValue("");
            }}
            className="flex-1 sm:flex-none"
          >
            By Year
          </Button>
          <Button
            variant={activeFilter === "zone" ? "secondary" : "outline"}
            onClick={() => {
              setActiveFilter("zone");
              table.getColumn("name")?.setFilterValue("");
              table.getColumn("collage")?.setFilterValue("");
              table.getColumn("year")?.setFilterValue("");
            }}
            className="flex-1 sm:flex-none"
          >
            By Zone
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Input
            placeholder={`Filter by ${activeFilter}...`}
            value={
              (table.getColumn(activeFilter)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(activeFilter)?.setFilterValue(event.target.value)
            }
            className="w-full sm:w-[200px]"
          />
          <DownloadTableExcel
            filename="Proficuus_Onboarding_Participants"
            sheet="Participants"
            currentTableRef={tableRef.current}
          >
            <Button
              variant="secondary"
              className="w-full sm:w-auto bg-[#2db66b] hover:bg-[#1e6b3e] text-white rounded-sm flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden sm:inline">Export to Excel</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </DownloadTableExcel>
        </div>
      </div>
      <div className="rounded-md border py-4">
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
                <TableRow key={row.id}>
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
                  No confirmed participants.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConfirmedParticipants;
