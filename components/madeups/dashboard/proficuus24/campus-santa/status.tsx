"use client";
import React, { useState, useEffect } from "react";
import StatusCalendar from "./modules/status-calendar";

type DayStatus = {
  day: number;
  status: boolean;
};

const Status = () => {
  const [daysData, setDaysData] = useState<DayStatus[]>([]);

  useEffect(() => {
    // Example: Generating 20 days with random status (true/false)
    const days = Array.from({ length: 20 }, (_, index) => ({
      day: index + 1,
      status: Math.random() > 0.5, // Random true or false value for each day
    }));

    setDaysData(days);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">20-Day Calendar</h1>
      {daysData.length > 0 ? (
        <StatusCalendar days={daysData} />
      ) : (
        <p className="text-lg text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Status;
