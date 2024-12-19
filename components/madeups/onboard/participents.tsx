"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { UserDetailsCard } from "./modules/user-detials-card";
import { useToast } from "@/hooks/use-toast";

interface UserDetails {
  name: string;
  zone: string;
  collage: string;
  email: string;
  phone: string;
}

export default function OnboardParticipants() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/onboard/participants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();

        if (response.ok) {
          setUserDetails(data.user);
          setShowUserDetails(true);
        } else {
          toast({
            variant: "destructive",
            description: data.message || "Failed to fetch user details",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: `Something went wrong. Please try again. ${error.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="flex items-center gap-3 mb-8">
            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <h1 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              Enter your mobile number
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 000-0000"
                  className="w-full pl-14 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-50 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                We&apos;ll verify your details
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 10}
              className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </form>
        </div>
      </div>

      <UserDetailsCard
        isOpen={showUserDetails}
        onClose={() => setShowUserDetails(false)}
        userDetails={userDetails!}
        type="participants"
      />
    </main>
  );
}
