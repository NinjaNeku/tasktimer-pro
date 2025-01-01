"use client";

import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon, MaximizeIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function MiniCalendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day) => setSelectedDate(day);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center mb-2">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <span className="text-sm font-bold">
          {format(currentMonth, dateFormat)}
        </span>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-xs font-bold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-1 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`p-1 text-center text-xs ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white"
                : ""
            } cursor-pointer`}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-2">{rows}</div>;
  };

  return (
    <div className={`border p-2 rounded ${isExpanded ? "w-full" : "w-64"}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Calendar</h3>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="icon"
        >
          <MaximizeIcon className="h-4 w-4" />
        </Button>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
