"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useRef, useState } from "react";
import Image from "next/image";
import { collage, year, zone } from "@/lib/constants";
import { useRouter } from "next/navigation";
// import FlickeringGrid from "@/components/ui/flickering-grid";

export const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  collage: z.string({
    required_error: "College is required.",
  }),
  year: z.string({
    required_error: "Year is required.",
  }),
  zone: z.string({
    required_error: "Please select a Zone.",
  }),
  phone: z
    .string()
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits.",
    })
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .max(15, {
      message: "Phone number must not exceed 15 digits.",
    }),
  alternativephone: z
    .string()
    .regex(/^\d+$/, {
      message: "Alternative phone number must contain only digits.",
    })
    .min(10, {
      message: "Alternative phone number must be at least 10 digits.",
    })
    .max(15, {
      message: "Alternative phone number must not exceed 15 digits.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),

  expectation: z.string({
    required_error: "this field is required.",
  }),
  experience: z.string({
    required_error: "Experience is required.",
  }),
  image: z.instanceof(File), // Add image field
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function Participant() {
  const { toast } = useToast();
  const [collageOpen, setCollageOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      field.onChange(file);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onSubmit = async (data: z.infer<typeof accountFormSchema>) => {
    setLoading(true);
    try {
      let imageBase64 = "";
      if (data.image) {
        // Convert image to Base64
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.image as File);
        });
      }

      const response = await fetch(
        "/api/registration/proficuus24/participants",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            collage: data.collage,
            year: data.year,
            zone: data.zone,
            phone: data.phone,
            alternativephone: data.alternativephone,
            email: data.email,
            expectation: data.expectation,
            experience: data.experience,
            image: imageBase64,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.message || "An error occurred while creating your account."
        );
      }

      const result = await response.json();
      setLoading(false);
      // Add success notification or redirect here
      toast({
        title: "Registration completed successfully",
        description: "We've completed your volunteer registration.",
        variant: "default",
      });
      console.log("Registration completed successfully:", result);
      setTimeout(() => {
        router.push("/success");
      }, 1000);
      // Add success notification or redirect here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error creating user",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error creating user:", error);
    }
  };

  return (
    <Form {...form}>
      {/* <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#FFC208"
        maxOpacity={0.1}
        flickerChance={0.1}
        // height={800}
        // width={800}
      /> */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel>Year</FormLabel>
                <Popover open={yearOpen} onOpenChange={setYearOpen}>
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
                          ? year.find((year) => year.value === field.value)
                              ?.label
                          : "Select Year"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search year..." />
                      <CommandList>
                        <CommandEmpty>No Year found.</CommandEmpty>
                        <CommandGroup>
                          {year.map((year) => (
                            <CommandItem
                              value={year.label}
                              key={year.value}
                              onSelect={() => {
                                form.setValue("year", year.value);
                                setYearOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  year.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {year.label}
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

          <FormField
            control={form.control}
            name="zone"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel>Zone</FormLabel>
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
                                form.setValue("zone", zone.value);
                                setZoneOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  zone.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
        </div>

        <FormField
          control={form.control}
          name="collage"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>College</FormLabel>
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
                      <CommandEmpty>No collage found.</CommandEmpty>
                      <CommandGroup>
                        {collage
                          .filter(
                            (c) => c.zone.toUpperCase() === form.watch("zone")
                          ) // Update this line
                          .map((collage) => (
                            <CommandItem
                              value={collage.label}
                              key={collage.value}
                              onSelect={() => {
                                form.setValue("collage", collage.value);
                                setCollageOpen(false);
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
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternativephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="your alternative phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email ID</FormLabel>
              <FormControl>
                <Input placeholder="your Email id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What do you expect from Proficuus 24?</FormLabel>
              <FormControl>
                <Input placeholder="your answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you attended any Jesus Youth programs before or other
                fellowship circles or teams etc? Specify in brief
              </FormLabel>
              <FormControl>
                <Input placeholder="your answer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload a casual single photo of yours</FormLabel>
              <FormControl>
                <div
                  className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition duration-200 bg-secondary"
                  onClick={() => fileInputRef.current!.click()} // Trigger file input on div click
                >
                  <span className="text-foreground">
                    Click to upload an image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, field)} // Update handler to use the new function
                    className="hidden"
                    ref={fileInputRef}
                  />
                </div>
              </FormControl>
              <FormDescription>This image is for your id card</FormDescription>
              <FormMessage />

              {imagePreview && ( // Render image preview if it exists
                <div className="mt-4">
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    width={200}
                    height={200}
                    className="rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        {/* <Button type="submit"></Button> */}
        <RainbowButton
          type="submit"
          disabled={loading}
          className="text-white bg-slate-900 dark:bg-white dark:text-slate-900"
        >
          {loading ? "Loading..." : "Register 💪"}
        </RainbowButton>
      </form>
    </Form>
  );
}
