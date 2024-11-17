"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/lib/provider/authProvider";
import { Participant } from "@/components/madeups/dashboard/proficuus24/participents/participants";

type UserContextType = {
  userData: Participant | null;
  error: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  userData: null,
  error: null,
  loading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<Participant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid && !user?.email) return; // Either UID or email must be available

      setLoading(true);
      setError(null);
      console.log(user);

      try {
        // Determine if we should use `uid` or `email` for the API call
        const queryParam = `email=${user.email}`;
        // user?.email !== "" ? `` : `uid=${user.uid}`;

        const response = await fetch(`/api/profile?${queryParam}`, {
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
        setUserData(data); // Assuming the response contains user data in the format you need
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.uid, user?.email, user]); // Dependency array updated to listen to both uid and email

  return (
    <UserContext.Provider value={{ userData, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
