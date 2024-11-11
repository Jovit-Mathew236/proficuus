"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center p-2 bg-blue z-50 backdrop-blur-sm rounded-lg">
      <div
        key={value}
        className="text-4xl md:text-6xl lg:text-8xl xl:text-[100px] font-bold text-white tabular-nums transition-all duration-500 ease-in-out transform scale-100 opacity-100"
        style={{ animation: "popIn 0.5s ease-out" }}
      >
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <Card className="w-full  mx-auto  bg-transparent border-none">
      <CardContent className="p-6 bg-transparent">
        <div className="flex gap-2 justify-between space-x-2">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </CardContent>
    </Card>
  );
}
