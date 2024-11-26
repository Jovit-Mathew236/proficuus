import React from "react";

type DayStatus = {
  day: number;
  status: boolean; // true = happy, false = sad
};

type CalendarProps = {
  days: DayStatus[];
};

const StatusCalendar: React.FC<CalendarProps> = ({ days }) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {days.map((day) => (
        <div
          key={day.day}
          className="flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-md"
        >
          <span className="text-xl font-semibold">{day.day}</span>
          <span className="text-3xl mt-2">{day.status ? "😊" : "😢"}</span>
        </div>
      ))}
    </div>
  );
};

export default StatusCalendar;
