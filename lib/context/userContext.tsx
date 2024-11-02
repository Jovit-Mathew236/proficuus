// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/lib/provider/authProvider";
import { Participant } from "@/components/madeups/volunteer/dashboard/participant";

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to fetch user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserWithId();
  }, [user?.uid]);

  return (
    <UserContext.Provider value={{ userData, error, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
