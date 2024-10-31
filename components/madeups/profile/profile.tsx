/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar2";
import {
  IconArrowLeft,
  // IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RainbowButton } from "@/components/ui/rainbow-button";
// import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/provider/authProvider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Ticket } from "@/components/ticket";
// import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const { basePath } = publicRuntimeConfig;
// const FormSchema = z.object({
//   image: z.instanceof(File), // Add image field
// });

// type FormValues = z.infer<typeof FormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<FormValues> = {};
export function Profile() {
  const links = [
    // {
    //   label: "Dashboard",
    //   href: "#",
    //   icon: (
    //     <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
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
      action: () => {
        logout(); // Call logout function on click
      },
    },
  ];
  const logout = async () => {
    try {
      await signOut(auth); // Perform Firebase sign-out
      window.location.href = "/login"; // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const [open, setOpen] = useState(false);
  const { username } = useAuth();
  return (
    <div
      className={cn(
        "md:rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "md:h-[100vh] h-min-[100vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} action={link.action} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: username || "User",
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
      <Image
        src="/images/logo.png"
        // src={`${basePath}/images/logo.png`}
        alt="logo"
        width={50}
        height={50}
      />
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
        src="images/logo.png"
        // src={`${basePath}/images/logo.png`}
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
  // const { toast } = useToast();
  const [userData, setUserData] = useState<any>();
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [uploadState, setUploadState] = useState(false);

  // const form = useForm<FormValues>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues,
  // });

  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const handleFileChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: any
  // ) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     field.onChange(file);
  //     const previewUrl = URL.createObjectURL(file);
  //     setImagePreview(previewUrl);
  //   }
  // };

  useEffect(() => {
    const fetchUserWithId = async () => {
      if (!user?.uid) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/profile?uid=${user.uid}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error: any) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWithId();
  }, [user?.uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // const onSubmit = async (data: FormValues) => {
  //   setLoading(true);
  //   try {
  //     let imageBase64 = "";
  //     if (data.image) {
  //       const reader = new FileReader();
  //       imageBase64 = await new Promise((resolve, reject) => {
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.onerror = reject;
  //         reader.readAsDataURL(data.image as File);
  //       });
  //     }

  //     const response = await fetch("/api/profile/payment-image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         image: imageBase64,
  //         uid: user?.uid,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const result = await response.json();
  //       throw new Error(
  //         result.message || "An error occurred while uploading the image."
  //       );
  //     }
  //     setUploadState(true);
  //     setLoading(false);

  //     toast({
  //       title: "Image uploaded successfully",
  //       description: "Wait some time we're verifying it",
  //       variant: "default",
  //     });
  //   } catch (error: any) {
  //     setLoading(false);
  //     console.error("Error uploading image:", error);
  //     toast({
  //       title: "Error uploading image",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   }
  // };

  return (
    <div className="flex flex-col p-5 md:flex-row md:p-10 md:rounded-tl-2xl border border-primary-foreground bg-background flex-1 w-full h-full gap-4">
      {/* Left Profile Card */}
      <div className="flex flex-col w-full md:w-1/3 bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
        <div className="flex flex-col items-center">
          <Image
            src={userData?.imageUrl || "https://assets.aceternity.com/manu.png"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full h-24 w-24 object-cover border-2 border-blue-500 shadow"
          />
          <p className="text-lg font-semibold mt-4">
            {userData?.name || "Loading..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {userData?.email || "Loading..."}
          </p>
        </div>
        <div className="mt-6 gap-4">
          <div className="grid grid-cols-2 gap-4 bg-primary-foreground dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            {["Zone", "Collage", "Phone", "Alternative Phone", "Year"].map(
              (field) => (
                <div
                  key={field}
                  className="flex flex-col py-3 px-4 bg-primary-foreground rounded-md shadow-sm"
                >
                  <p className="font-semibold">{field}</p>
                  <p className="font-normal text-sm">
                    {userData?.[field.toLowerCase().replace(" ", "")] ||
                      "Loading..."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-2/3 gap-6">
        {/* <div className="flex flex-col bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">My Payment</h3>
          <div className="flex justify-between items-center mb-4">
            <p>Payment Screenshot upload</p>
            <button
              className={`px-3 py-1 text-sm text-white rounded-full ${
                userData?.paymentUpload
                  ? "bg-green-500"
                  : "bg-gradient-to-r from-pink-500 to-orange-500"
              }`}
            >
              {userData?.paymentUpload || uploadState ? "Uploaded" : "Pending"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p>Payment Verification</p>
            <button
              className={`px-3 py-1 text-sm text-white rounded-full ${
                userData?.paymentVerified
                  ? "bg-green-500"
                  : "bg-gradient-to-r from-pink-500 to-orange-500"
              }`}
            >
              {userData?.paymentVerified ? "Verified" : "Pending"}
            </button>
          </div>
        </div>

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
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <span className="text-foreground">
                          Click to upload an image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, field)}
                          className="hidden"
                          ref={fileInputRef}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This image is used for payment verification
                    </FormDescription>
                    <FormMessage />
                    {imagePreview && (
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
              <RainbowButton
                type="submit"
                disabled={loading || userData?.paymentUpload}
                className="text-white bg-slate-900 dark:bg-white dark:text-slate-900"
              >
                {loading ? "Loading..." : "Upload Your Payment Image 💪"}
              </RainbowButton>
            </form>
          </Form>
        </div> */}

        <div className="flex flex-col bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Your Ticket</h3>
          <div
            className={`flex justify-center items-center ${
              userData?.paymentVerified ? "" : "blur-xl"
            }`}
          >
            <Ticket
              name={
                (userData?.paymentVerified && userData?.name) || "Loading..."
              }
              zone={
                (userData?.paymentVerified && userData?.zone) || "Loading..."
              }
              collage={
                (userData?.paymentVerified && userData?.collage) || "Loading..."
              }
              userId={
                (userData?.paymentVerified && userData?.userId) || "Loading..."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
