"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Participant } from "@/components/madeups/dashboard/proficuus24/participents/participants";

type ParticipantsContextType = {
  participantsData: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  error: string | null;
  loading: boolean;
};

const ParticipantContext = createContext<ParticipantsContextType>({
  participantsData: [],
  setParticipants: () => {},
  error: null,
  loading: false,
});

export const ParticipantsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [participantsData, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "/api/dashboard/proficuus24/participants",
          {
            cache: "no-store",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch participants.");
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []); // Dependency array updated to listen to both uid and email

  return (
    <ParticipantContext.Provider
      value={{ participantsData, setParticipants, error, loading }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipants = () => useContext(ParticipantContext);
