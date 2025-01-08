"use client";

import { useState, useEffect } from "react";
import { format, isToday } from "date-fns";
import TaskList from "./TaskList";
import Timer from "./Timer";
import MiniCalendar from "./MiniCalendar";

export default function TaskTimerApp() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    if (isToday(selectedDate)) {
      const newTask = {
        id: Date.now(),
        name: taskName,
        timeSpent: 0,
        date: format(selectedDate, "yyyy-MM-dd"),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const updateTaskTime = (taskId, time) => {
    if (isToday(selectedDate)) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, timeSpent: task.timeSpent + time }
            : task
        )
      );
    }
  };

  const resetTaskTime = (taskId) => {
    if (isToday(selectedDate)) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, timeSpent: 0 } : task
        )
      );
    }
  };

  const removeTask = (taskId) => {
    if (isToday(selectedDate)) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      if (currentTask && currentTask.id === taskId) {
        setCurrentTask(null);
      }
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.date === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="w-full lg:w-2/3 space-y-4">
        <TaskList
          tasks={filteredTasks}
          addTask={addTask}
          setCurrentTask={setCurrentTask}
          resetTaskTime={resetTaskTime}
          removeTask={removeTask}
          isEditable={isToday(selectedDate)}
        />
        <Timer
          currentTask={currentTask}
          updateTaskTime={updateTaskTime}
          isEditable={isToday(selectedDate)}
        />
      </div>
      <div className="w-full lg:w-1/3">
        <MiniCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
