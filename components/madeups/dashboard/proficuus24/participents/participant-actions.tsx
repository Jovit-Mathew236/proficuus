"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  CheckIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Participant } from "./participants";
import { collage, zone } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const FormSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

export const EditFormSchema = z.object({
  zone: z.string({
    required_error: "Please select a Zone.",
  }),
  collage: z.string({
    required_error: "College is required.",
  }),
});

type Props = {
  participant: Participant;
  onSubmit: (
    data: z.infer<typeof FormSchema> | z.infer<typeof FormSchema>,
    participant: Participant
  ) => void;
  onEditFormSubmit: (
    data: z.infer<typeof EditFormSchema> | z.infer<typeof EditFormSchema>,
    participant: Participant
  ) => void;
};

const ParticipantActions = ({
  participant,
  onSubmit,
  onEditFormSubmit,
}: Props) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const editForm = useForm({
    resolver: zodResolver(EditFormSchema),
    defaultValues: { zone: "", collage: "" },
  });

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [collageOpen, setCollageOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);
  // const [isOtherSelected, setIsOtherSelected] = useState(false);
  // const [otherCollage, setOtherCollage] = useState("");

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit(data, participant);
  };

  const handleEditFormSubmit = async (data: z.infer<typeof EditFormSchema>) => {
    await onEditFormSubmit(data, participant);
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(false);

    // try {
    //   const response = await fetch(
    //     `/api/dashboard/proficuus24/participants/delete`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ id: participant.uid }),
    //     }
    //   );

    //   if (response.ok) {
    //     alert("Participant deleted successfully");
    //   } else {
    //     alert("Failed to delete participant");
    //   }
    // } catch (error) {
    //   console.error("Error deleting participant:", error);
    //   alert("Error deleting participant");
    // }
  };

  return (
    <Dialog>
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
            onClick={() => navigator.clipboard.writeText(participant.email)}
          >
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              (window.location.href = `https://wa.me/${participant.phone}`)
            }
          >
            Whatsapp Msg
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              {participant.isCoordinator
                ? "Coordinator"
                : "Mark as Coordinator"}
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={() => setEditFormOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteConfirmationOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={isDeleteConfirmationOpen}
        onOpenChange={setDeleteConfirmationOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will permanently delete the participant.
            </DialogDescription>
          </DialogHeader>
          <Button variant="destructive" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => setDeleteConfirmationOpen(false)}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={editFormOpen} onOpenChange={setEditFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit the collage and zone</DialogTitle>
            <DialogDescription>
              This action will edit the collage and zone of the participant.
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditFormSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={editForm.control}
                name="zone"
                render={({ field }) => (
                  <FormItem className="flex w-1/2 flex-col">
                    <FormLabel>Zone *</FormLabel>
                    <Popover open={zoneOpen} onOpenChange={setZoneOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? zone.find((zone) => zone.value === field.value)
                                  ?.label
                              : "Select Zone"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Zone..." />
                          <CommandList>
                            <CommandEmpty>No Zone found.</CommandEmpty>
                            <CommandGroup>
                              {zone.map((zone) => (
                                <CommandItem
                                  value={zone.label}
                                  key={zone.value}
                                  onSelect={() => {
                                    editForm.setValue("zone", zone.value);
                                    setZoneOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      zone.value === field.value &&
                                        "opacity-100"
                                    )}
                                  />
                                  {zone.label}
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
              {/* Collage Selection */}
              <FormField
                control={editForm.control}
                name="collage"
                render={({ field }) => (
                  <FormItem className="flex w-1/2 flex-col">
                    <FormLabel>Collage *</FormLabel>
                    <Popover open={collageOpen} onOpenChange={setCollageOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? collage.find(
                                  (collage) => collage.value === field.value
                                )?.label
                              : "Select Collage"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Collage..." />
                          <CommandList>
                            <CommandEmpty>No Collage found.</CommandEmpty>
                            <CommandGroup>
                              {collage.map((collage) => (
                                <CommandItem
                                  value={collage.label}
                                  key={collage.value}
                                  onSelect={() => {
                                    editForm.setValue("collage", collage.value);
                                    setCollageOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      collage.value === field.value &&
                                        "opacity-100"
                                    )}
                                  />
                                  {collage.label}
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

              <Button type="submit" variant="default">
                Submit
              </Button>
              <Button variant="outline" onClick={() => setEditFormOpen(false)}>
                Cancel
              </Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>2 step verification</DialogTitle>
          <DialogDescription>For extra security</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          {/* Provide form context here */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {[0, 1, 2].map((index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {[3, 4, 5].map((index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the secret code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantActions;
