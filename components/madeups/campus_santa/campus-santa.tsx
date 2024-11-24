"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { collage, year } from "@/lib/constants";

const formSchema = z.object({
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
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
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
});

export default function CampusSanta() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log(data);
      const response = await fetch(
        "/api/registration/proficuus24/campus-santa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            collage: data.collage,
            year: data.year,
            phone: data.phone,
            email: data.email,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(
          result.message || "An error occurred while creating your account."
        );
      }

      toast({
        title: "Success",
        description: "Your form has been submitted successfully.",
      });

      form.reset();
    } catch (error: unknown) {
      console.error("Form submission error", error);

      if (error instanceof Error) {
        // If the error is an instance of Error, check the status and show the appropriate toast
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((error as any).status != 400) {
          toast({
            title: error.message || "An error occurred",
            className: "bg-green-500",
            color: "green",
          });
        } else {
          toast({
            title: error.message || "An error occurred",
            variant: "destructive",
          });
        }
      } else {
        // If the error is not an instance of Error, handle it here
        toast({
          title: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10 molle"
      >
        <FormField
          control={form.control}
          name="collage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collage</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Collage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collage.map((collage, i) => (
                    <SelectItem key={i} value={collage.value}>
                      {collage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" type="" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {year
                    .filter((year) => year.value != "passout")
                    .map((year, i) => (
                      <SelectItem key={i} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="your phone number"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-6 rounded-sm shadow-lg hover:from-red-400 hover:to-red-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
