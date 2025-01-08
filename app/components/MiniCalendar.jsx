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
  isToday,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function MiniCalendar({ selectedDate, setSelectedDate, tasks }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day) => setSelectedDate(day);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={prevMonth}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <span className="text-lg font-semibold text-foreground">
          {format(currentMonth, dateFormat)}
        </span>
        <Button
          onClick={nextMonth}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center text-sm font-medium text-muted-foreground"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
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
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentDay = isToday(day);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`
              relative p-2 text-center transition-colors cursor-pointer
              hover:bg-accent hover:text-accent-foreground rounded-lg
              ${!isCurrentMonth ? "text-muted-foreground" : "text-foreground"}
              ${
                isSelected
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }
              ${
                isCurrentDay && !isSelected
                  ? "bg-accent text-accent-foreground font-semibold"
                  : ""
              }
            `}
          >
            <span className="text-sm">{formattedDate}</span>
            {dayTasks.length > 0 && (
              <div
                className={`text-xs mt-1 font-medium ${
                  isSelected ? "text-primary-foreground/80" : "text-primary"
                }`}
              >
                {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
              </div>
            )}
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
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Calendar</h2>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
