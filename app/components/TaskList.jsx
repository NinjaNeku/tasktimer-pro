"use client";

import { useState } from "react";
import { PlusIcon, RefreshCwIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TaskList({
  tasks = [],
  addTask,
  setCurrentTask,
  resetTaskTime,
  removeTask,
}) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow"
        />
        <Button type="submit">
          <PlusIcon className="h-5 w-5" />
          Add
        </Button>
      </form>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{task.name}</span>
              <div className="flex items-center space-x-2">
                <span className="mr-2">
                  {Math.floor(task.timeSpent / 60)}m {task.timeSpent % 60}s
                </span>
                <Button onClick={() => setCurrentTask(task)} size="sm">
                  Start
                </Button>
                <Button
                  onClick={() => resetTaskTime(task.id)}
                  size="sm"
                  variant="outline"
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => removeTask(task.id)}
                  size="sm"
                  variant="destructive"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks for this day. Add a task to get started!</p>
      )}
    </div>
  );
}
