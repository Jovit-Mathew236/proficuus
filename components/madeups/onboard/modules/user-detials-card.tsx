"use client";

import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface UserDetailsCardProps {
  isOpen: boolean;
  onClose: () => void;
  userDetails: {
    name: string;
    zone: string;
    collage: string;
    email: string;
    phone: string;
    attendanceStatus?: boolean;
  };
  type: "participant" | "volunteers";
}

export function UserDetailsCard({
  isOpen,
  onClose,
  userDetails,
  type,
}: UserDetailsCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isMarked, setIsMarked] = useState(
    userDetails?.attendanceStatus ?? false
  );

  const handleMarkAttendance = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/onboard/${type}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: userDetails.phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to mark attendance");
      }

      setIsMarked(true);
      toast({
        title: "Success!",
        description: "Your attendance has been marked for today.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to mark attendance",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            User Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Name
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                {userDetails.name}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Zone
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                {userDetails.zone}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                College
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                {userDetails.collage}
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium">
                {userDetails.email}
              </p>
            </div>
          </div>

          {isMarked || userDetails.attendanceStatus ? (
            <div className="mt-6 text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Already Onboarded!
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your attendance has been marked for today
              </p>
            </div>
          ) : (
            <button
              onClick={handleMarkAttendance}
              disabled={isLoading}
              className="w-full mt-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              {isLoading ? "Marking..." : "Mark Attendance"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
