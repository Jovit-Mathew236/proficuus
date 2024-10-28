/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar2";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/provider/authProvider";
const FormSchema = z.object({
  image: z.instanceof(File), // Add image field
});

type FormValues = z.infer<typeof FormSchema>;

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {};
export function Profile() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/images/logo.png" alt="logo" width={50} height={50} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Proficuus&apos;24
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src="/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        // className="ml-1"
      />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
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
  console.log(user?.uid);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("/api/profile/", {
          cache: "no-store",
          method: "GET",
          body: JSON.stringify({
            uid: user?.uid,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch volunteers.");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVolunteers();
    console.log(userData);
  }, [user?.uid, userData]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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

      const response = await fetch("/api/registration/proficuus24/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
        }),
      });

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
    <div className="flex flex-1">
      <div className="md:p-10 rounded-tl-2xl border border-primary-foreground bg-background  flex flex-row flex-1 w-full h-full gap-4">
        {/* Left Profile Card */}
        <div className="flex flex-col w-1/3 bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
          <div className="flex flex-col items-center">
            <Image
              src="https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?cs=srgb&dl=pexels-wojciech-kumpicki-1084687-2071882.jpg&fm=jpg"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full h-24 w-24 object-cover border-2 border-blue-500 shadow"
            />
            <p className="text-lg font-semibold mt-4">Jovit Mathew</p>
            <p className="text-sm text-gray-500 mt-2">jovit@example.com</p>
            {/* <button className="mt-4 px-4 py-2 text-white rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
              Save
            </button> */}
          </div>
          <div className="mt-6 space-y-3">
            {["Zone", "College", "Phone Number"].map((label, index) => (
              <div
                key={index}
                className="flex justify-between py-1 border-b border-gray-200"
              >
                <p className="font-medium text-gray-600">{label}</p>
                <p className="text-gray-800">Pala</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column with Two Cards */}
        <div className="flex flex-col w-2/3 gap-6">
          {/* My xPay Accounts Card */}
          <div className="flex flex-col bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">My xPay accounts</h3>
            <div className="flex justify-between items-center mb-4">
              <p>Payment Screenshot upload</p>
              <button className="px-3 py-1 text-sm text-white rounded-full bg-green-500">
                Uploaded
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p>Payment Verification</p>
              <button className="px-3 py-1 text-sm text-white rounded-full bg-gradient-to-r from-pink-500 to-orange-500">
                Pending
              </button>
            </div>
          </div>

          {/* My Bills Card */}
          <div className="flex flex-col bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">My Payment Upload</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Upload your screenshot after your payment
                      </FormLabel>
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
                      <FormDescription>
                        This image is used for payment verification
                      </FormDescription>
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
                  {loading ? "Loading..." : "Upload Your Payment 💪"}
                </RainbowButton>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
