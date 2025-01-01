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
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Calendar({ tasks, selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(currentMonth));

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setCurrentWeek(startOfWeek(addMonths(currentMonth, 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setCurrentWeek(startOfWeek(subMonths(currentMonth, 1)));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <span className="text-lg font-bold">
          {format(currentMonth, dateFormat)}
        </span>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 gap-2 mb-2">{days}</div>;
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
        const dayTasks = tasks.filter(
          (task) => task.date === format(cloneDay, "yyyy-MM-dd")
        );
        days.push(
          <div
            key={day}
            className={`p-2 border ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white"
                : ""
            } cursor-pointer`}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="text-sm">{formattedDate}</span>
            {dayTasks.length > 0 && (
              <div className="text-xs mt-1">
                {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4">{rows}</div>;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
