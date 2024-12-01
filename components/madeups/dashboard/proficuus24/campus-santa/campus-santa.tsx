"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Zod schema for form validation
const formSchema = z.object({
  college: z.string(),
  day: z.coerce.date(),
});

type collageData = {
  college: string;
  date: string;
  status: string;
  task: string;
};

export default function CampusSanta() {
  const { toast } = useToast();
  const [colleges, setColleges] = useState<string[]>([]);
  const [collegeData, setCollegeData] = useState<collageData[]>([]);

  // Fetch colleges data when the component mounts
  useEffect(() => {
    fetch("/api/campus_santa?action=getColleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data.data); // Assuming the response contains the list of colleges
      })
      .catch((error) => console.error("Error fetching colleges:", error));
  }, []);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: new Date(),
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Format the date and prepare the query parameters
      const formattedDate = format(values.day, "dd-MM-yyyy");
      const queryParams = new URLSearchParams({
        college: values.college,
        date: formattedDate,
      });

      // Make the GET request with query parameters in the URL
      fetch(`/api/campus_santa?action=getData&${queryParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCollegeData(data.data); // Update the table with the fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast({
            title: "Error",
            description: "An error occurred while fetching data.",
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("Form submission error", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
        variant: "destructive",
      });
    }
  }

  // Handle "Mark as Done" button click
  const handleMarkAsDone = (college: string, date: string) => {
    const formattedDate = date.split("-").reverse().join("-");

    fetch(`/api/campus_santa/update_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "updateStatus",
        college,
        date: formattedDate,
        status: "Done",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCollegeData((prevData) =>
            prevData.map((item) =>
              item.college === college && item.date === date
                ? { ...item, status: "Done" }
                : item
            )
          );
          toast({
            title: "Success",
            description: data.message || "Status updated successfully.",
          });
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to update status.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast({
          title: "Error",
          description: "An error occurred while updating the status.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="z-10 px-4 py-6 md:px-8 max-w-[90%]">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* College Dropdown */}
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select College</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? colleges.find(
                                (college) => college === field.value
                              )
                            : "Select College"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
                        <CommandList>
                          <CommandEmpty>No College found.</CommandEmpty>
                          <CommandGroup>
                            {colleges.map((college, i) => (
                              <CommandItem
                                value={college}
                                key={i}
                                onSelect={() => {
                                  form.setValue("college", college);
                                }}
                              >
                                {college}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Picker */}
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Day</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full sm:w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      {/* Table to display fetched data */}
      <Table className="mt-6 w-[90%] overflow-scroll">
        <TableCaption>College Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {collegeData?.map((college, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{college.date}</TableCell>
              <TableCell>{college.college}</TableCell>
              <TableCell>{college.task}</TableCell>
              <TableCell className="text-right">{college.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleMarkAsDone(college.college, college.date)
                  }
                  className="w-full sm:w-auto"
                >
                  Mark as Done
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
