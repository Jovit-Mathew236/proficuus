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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { Participant } from "./participants";

export const FormSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

type Props = {
  participant: Participant;
  onSubmit: (
    data: z.infer<typeof FormSchema>,
    participant: Participant
  ) => void;
};

const ParticipantActions = ({ participant, onSubmit }: Props) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmit(data, participant);
  };

  const handleDelete = async () => {
    // Close the confirmation dialog
    setDeleteConfirmationOpen(false);

    try {
      const response = await fetch(
        `/api/dashboard/proficuus24/participants/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: participant.uid }), // Send participant ID for deletion
        }
      );

      if (response.ok) {
        alert("Participant deleted successfully");
        // You can add logic to remove the participant from the UI list if needed
      } else {
        alert("Failed to delete participant");
      }
    } catch (error) {
      console.error("Error deleting participant:", error);
      alert("Error deleting participant");
    }
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
          {/* Trigger confirmation dialog on delete click */}
          <DropdownMenuItem onClick={() => setDeleteConfirmationOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
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
