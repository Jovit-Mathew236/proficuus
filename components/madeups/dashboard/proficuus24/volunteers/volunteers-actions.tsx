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
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  CheckIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
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
import { Volunteer } from "./volunteers";
import { collage } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const FormSchema = z.object({
  collage: z.string(),
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

type Props = {
  volunteer: Volunteer;
  onSubmit: (data: z.infer<typeof FormSchema>, volunteer: Volunteer) => void;
  handleDelete: (volunteer: Volunteer) => void;
};

const VolunteersActions = ({ volunteer, onSubmit, handleDelete }: Props) => {
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [collageOpen, setCollageOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherCollage, setOtherCollage] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "", collage: "" },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit(data, volunteer);
  };
  const onHandleDelete = async () => {
    setDeleteConfirmationOpen(false);
    await handleDelete(volunteer);
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
            onClick={() => navigator.clipboard.writeText(volunteer.email)}
          >
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              (window.location.href = `https://wa.me/${volunteer.phone}`)
            }
          >
            Whatsapp Msg
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              {volunteer.isCoordinator ? "Coordinator" : "Mark as Coordinator"}
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setDeleteConfirmationOpen(true)}
          >
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
          <Button variant="destructive" onClick={onHandleDelete}>
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

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>2 step verification</DialogTitle>
          <DialogDescription>For extra security</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          {" "}
          {/* Provide form context here */}
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="collage"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel>College *</FormLabel>
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
                            ? collage.find((c) => c.value === field.value)
                                ?.label || otherCollage
                            : "Select College"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search College..." />
                        <CommandList>
                          <CommandEmpty>No college found.</CommandEmpty>
                          <CommandGroup>
                            {collage.map((collage) => (
                              <CommandItem
                                value={collage.label}
                                key={collage.value}
                                onSelect={() => {
                                  form.setValue("collage", collage.value);
                                  setCollageOpen(false);
                                  setIsOtherSelected(false); // Reset "Other" selection
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    collage.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {collage.label}
                              </CommandItem>
                            ))}
                            <CommandItem
                              value="Other"
                              onSelect={() => {
                                setIsOtherSelected(true);
                                setOtherCollage(""); // Reset input when selected
                              }}
                            >
                              Select Other
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                        {isOtherSelected && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Enter your college name"
                              value={otherCollage}
                              onChange={(e) => setOtherCollage(e.target.value)}
                              className="border rounded p-2 w-full"
                            />
                            <Button
                              onClick={() => {
                                form.setValue("collage", otherCollage);
                                field.value = otherCollage;
                                setCollageOpen(false);
                              }}
                              className="mt-2"
                            >
                              Confirm
                            </Button>
                          </div>
                        )}
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default VolunteersActions;
