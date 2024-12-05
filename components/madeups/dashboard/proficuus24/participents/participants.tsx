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

import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import ParticipantActions, {
  EditFormSchema,
  FormSchema,
} from "./participant-actions";
import { useParticipants } from "@/lib/context/participantContext";

export type Participant = {
  name: string;
  collage: string;
  year: number;
  zone: string;
  phone: string;
  gender: string;
  alternativephone: string;
  expectation: string;
  experience: string;
  email: string;
  uid: string;
  paymentUpload: boolean;
  paymentVerified: boolean;
  isCoordinator: boolean;
  imageUrl: string;
};

export function ParticipantsDashboard() {
  const tableRef = useRef(null);
  const { setParticipants, participantsData, loading, error } =
    useParticipants();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { toast } = useToast();

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
    participant: Participant
  ) {
    if (data.pin == "122524") {
      try {
        const response = await fetch("/api/profile/update-is-coordinator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: participant.uid,
            isCoordinator: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update payment verification.");
        }

        setParticipants((prevParticipants) =>
          prevParticipants.map((p) =>
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
        description: "Please enter the correct Password",
        variant: "destructive",
        duration: 2000,
      });
    }
  }
  async function onEditFormSubmit(
    data: z.infer<typeof EditFormSchema>,
    participant: Participant
  ) {
    try {
      const response = await fetch(
        "/api/dashboard/proficuus24/participants/edit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: participant.uid,
            collage: data.collage,
            zone: data.zone,
          }),
        }
      );
      const Resdata: { message: string } = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update payment verification.");
      }

      setParticipants((prevParticipants) =>
        prevParticipants.map((p) =>
          p.email === participant.email
            ? { ...p, collage: data.collage, zone: data.zone }
            : p
        )
      );
      console.log(Resdata.message, Resdata);

      toast({
        title: "Success",
        description: Resdata.message,
        variant: "default",
        duration: 2000,
      });
    } catch (err) {
      console.error(err);
    }
  }
  const handleDelete = async (participant: Participant) => {
    // setDeleteConfirmationOpen(false);

    try {
      const response = await fetch(
        `/api/dashboard/proficuus24/participants/delete?id=${participant.uid}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p.email !== participant.email)
        );
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
          duration: 5000,
        });
      } else {
        console.error("Failed to delete:", data.message || response.statusText);
        toast({
          title: "Error",
          description: data.error || response.statusText,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle network or other errors
    }
  };
  // const handleTogglePaymentVerified = async (participant: Participant) => {
  //   if (participant.paymentUpload) {
  //     // const updatedValue = !participant.paymentVerified;

  //     try {
  //       const response = await fetch("/api/profile/update-payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           uid: participant.uid,
  //           paymentVerified: true,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to update payment verification.");
  //       }

  //       setParticipants((prevParticipants) =>
  //         prevParticipants.map((p) =>
  //           p.email === participant.email ? { ...p, paymentVerified: true } : p
  //         )
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     alert("Payment must be uploaded to change verification status.");
  //   }
  // };

  const columns: ColumnDef<Participant>[] = [
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
      accessorKey: "gender",
      header: () => <div>Gender</div>,
      cell: ({ row }) => <div>{row.getValue("gender")}</div>,
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
    // {
    //   accessorKey: "paymentUpload",
    //   header: () => <div>Payment Uploaded</div>,
    //   cell: ({ row }) => (
    //     <div>{row.getValue("paymentUpload") ? "Yes" : "No"}</div>
    //   ),
    // },
    // {
    //   accessorKey: "paymentVerified",
    //   header: () => <div>Payment Verified</div>,
    //   cell: ({ row }) => (
    //     <div>{row.getValue("paymentVerified") ? "Yes" : "No"}</div>
    //   ),
    // },
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
        const participant = row.original;
        return (
          <ParticipantActions
            participant={participant}
            onSubmit={onSubmit} // Pass the onSubmit function here
            onEditFormSubmit={onEditFormSubmit}
            handleDelete={handleDelete}
          />
          // <></>
        );
      },
    },
  ];

  // Fetch participant data

  const table = useReactTable({
    data: participantsData,
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
    pageCount: Math.ceil(participantsData.length / 10),
    manualPagination: true,
  });

  const { state } = useSidebar();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
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
