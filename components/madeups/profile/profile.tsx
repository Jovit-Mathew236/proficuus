"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "@/lib/context/userContext";
import { Ticket } from "@/components/ticket";
import { Participant } from "../dashboard/proficuus24/participents/participants";
import html2canvas from "html2canvas";
import { Download, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Profile = () => {
  const { userData, error, loading } = useUser();
  const [isDownloading, setIsDownloading] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);

  const fieldMapping: Record<string, keyof Participant> = {
    Zone: "zone",
    College: "collage",
    Phone: "phone",
    "Alternative Phone": "alternativephone",
    Year: "year",
  };

  const handleDownloadTicket = () => {
    setIsDownloading(true);
  };

  const handleDownloadProfileImage = () => {
    if (profileImageRef.current) {
      html2canvas(profileImageRef.current, {
        useCORS: true,
        scale: 3,
        backgroundColor: null,
        imageTimeout: 0,
        allowTaint: true,
        logging: false,
      })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${userData?.name || "Profile"}-generated-image.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating profile image", error);
          alert("Failed to generate profile image. Please try again.");
        });
    }
  };

  useEffect(() => {
    const downloadTicket = async () => {
      if (isDownloading && ticketRef.current) {
        try {
          const canvas = await html2canvas(ticketRef.current, {
            useCORS: true,
            scale: 3,
            scrollX: 0,
            scrollY: 0,
            backgroundColor: null,
            imageTimeout: 0,
            allowTaint: true,
            logging: false,
          });

          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${
            userData?.name + " proficuus'24 ticket" || "proficuus'24 ticket"
          }.png`;
          link.click();
        } catch (error) {
          console.error("Error generating ticket download", error);
          alert("Failed to generate ticket. Please try again.");
        } finally {
          setIsDownloading(false);
        }
      }
    };

    if (isDownloading) {
      downloadTicket();
    }
  }, [isDownloading, userData?.name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-1 md:px-4 py-4 grid md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className="md:col-span-1 rounded-2xl">
        <CardHeader className="items-center">
          <div className="relative">
            <Image
              src={userData?.imageUrl || "/images/logo.png"}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full h-36 w-36 object-cover border-4 border-blue-500 shadow-lg transition-transform hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo.png";
                setProfileImageError(true);
              }}
            />
            {profileImageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <Camera className="text-white" size={48} />
              </div>
            )}
          </div>
          <CardTitle className="text-center mt-4">
            <p className="text-xl font-bold">
              {userData?.name || "Loading..."}
            </p>
            <p className="text-sm mt-1">{userData?.email || "Loading..."}</p>
          </CardTitle>
          <Badge variant="secondary" className="mt-2">
            {userData?.isCoordinator
              ? "Coordinator"
              : userData?.uid
              ? "Participant"
              : "Volunteer"}
          </Badge>
        </CardHeader>
        <CardContent className="px-2 py-3 md:p-6">
          <div className="grid grid-cols-2 gap-4 bg-neutral-100/10  backdrop-blur-sm rounded-xl p-4 shadow-xl">
            {Object.keys(fieldMapping).map((field) => (
              <div
                key={field}
                className={cn(
                  "group",
                  "bg-white/30 dark:bg-background/30",
                  "border border-neutral-300 dark:border-neutral-600/10",
                  "rounded-xl p-4",
                  "text-center",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:scale-[1.03]",
                  "hover:border-blue-300 dark:hover:border-blue-700",
                  "transform origin-center"
                )}
              >
                <p
                  className={cn(
                    "font-semibold",
                    "text-neutral-700 dark:text-neutral-200",
                    "mb-2",
                    "text-sm uppercase tracking-wider",
                    "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                    "transition-colors"
                  )}
                >
                  {field}
                </p>
                <p
                  className={cn(
                    "text-base",
                    "font-light",
                    "text-neutral-900 dark:text-neutral-100",
                    "group-hover:text-blue-800 dark:group-hover:text-blue-300"
                  )}
                >
                  {userData?.[fieldMapping[field]] || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ticket and Profile Image Section */}
      <div className="md:col-span-2 space-y-6">
        {/* Ticket Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Event Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-6">
              <div
                ref={ticketRef}
                className={`flex justify-center items-center h-fit w-fit ${
                  isDownloading ? "min-w-[800px]" : ""
                }`}
              >
                <Ticket
                  name={userData?.name || "Loading..."}
                  zone={userData?.zone || "Loading..."}
                  collage={userData?.collage || "Loading..."}
                  userId={userData?.uid || "Loading..."}
                  isDownloading={isDownloading}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleDownloadTicket}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                <Download className="mr-2" /> Download Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Image Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profile Image Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div
                ref={profileImageRef}
                className="relative w-72 h-72 mb-6  overflow-hidden shadow-lg"
              >
                <div className="relative inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 z-0"></div>
                <Image
                  src="/images/dp.png"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="absolute z-20 "
                />
                <Image
                  src={userData?.imageUrl || "/images/logo.png"}
                  alt="Profile pic"
                  layout="fill"
                  objectFit="cover"
                  className="absolute z-10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/logo.png";
                  }}
                />
              </div>
              <Button
                onClick={handleDownloadProfileImage}
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-all"
              >
                <Camera className="mr-2" /> Download Profile Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
