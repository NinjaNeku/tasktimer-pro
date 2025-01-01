"use client";

import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import Timer from "./Timer";
import Calendar from "./Calendar";
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
    const newTask = {
      id: Date.now(),
      name: taskName,
      timeSpent: 0,
      date: selectedDate.toISOString().split("T")[0],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTaskTime = (taskId, time) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, timeSpent: task.timeSpent + time }
          : task
      )
    );
  };

  const resetTaskTime = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, timeSpent: 0 } : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (currentTask && currentTask.id === taskId) {
      setCurrentTask(null);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => task.date === selectedDate.toISOString().split("T")[0]
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="w-2/3">
          <TaskList
            tasks={filteredTasks}
            addTask={addTask}
            setCurrentTask={setCurrentTask}
            resetTaskTime={resetTaskTime}
            removeTask={removeTask}
          />
          <Timer currentTask={currentTask} updateTaskTime={updateTaskTime} />
        </div>
        <div className="w-1/3">
          <MiniCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
      <Calendar
        tasks={tasks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}
