/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useUser } from "@/lib/context/userContext";
import { Ticket } from "@/components/ticket";
import { Participant } from "../dashboard/participents/participants";
import html2canvas from "html2canvas";
import GitHubButton from "@/components/ui/liquid-btn";
import { Download } from "lucide-react";

export const Profile = () => {
  const { userData, error, loading } = useUser();

  const ticketRef = useRef<HTMLDivElement>(null); // Ref for capturing ticket

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const fieldMapping: Record<string, keyof Participant> = {
    Zone: "zone",
    Collage: "collage",
    Phone: "phone",
    "Alternative Phone": "alternativephone",
    Year: "year",
  };

  const handleDownloadTicket = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          useCORS: true, // Allow cross-origin resources
          scrollX: 0, // Ensure there is no scroll offset
          scrollY: 0, // Ensure there is no scroll offset
          x: 0, // Capture from top-left corner
          y: 0, // Capture from top-left corner
          backgroundColor: null, // Transparent background, so it's clean
          logging: false, // Disable logging for performance
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
      }
    }
  };

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
            {Object.keys(fieldMapping).map((field) => (
              <div
                key={field}
                className="flex flex-col py-3 px-4 bg-primary-foreground rounded-md shadow-sm"
              >
                <p className="font-semibold">{field}</p>
                <p className="font-normal text-sm">
                  {userData?.[fieldMapping[field]] || "Loading..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Section */}
      <div className="flex flex-col w-full md:w-2/3 gap-6">
        <div className="flex flex-col bg-primary-foreground rounded-2xl overflow-hidden shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Your Ticket</h3>
          <div className="w-full flex justify-center">
            <div
              className="flex justify-center items-center h-fit w-fit"
              ref={ticketRef}
            >
              <Ticket
                name={userData?.name || "Loading..."}
                zone={userData?.zone || "Loading..."}
                collage={userData?.collage || "Loading..."}
                userId={userData?.uid || "Loading..."}
              />
            </div>
          </div>
          {/* Download Button */}
          <div className="flex justify-center mt-7">
            <GitHubButton
              title="Download Ticket" // Dynamic title
              onClick={handleDownloadTicket} // Action when clicked
              Icon={Download}
            />{" "}
            {/* <button
              onClick={handleDownloadTicket}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Download Ticket
            </button> */}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
