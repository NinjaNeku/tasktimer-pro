"use client";

import { useState } from "react";
import { PlusIcon, RefreshCwIcon, TrashIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TaskList({
  tasks = [],
  addTask,
  setCurrentTask,
  resetTaskTime,
  removeTask,
  isEditable,
}) {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() && isEditable) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold text-foreground mb-4">Tasks</h2>
      {isEditable && (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow text-foreground"
          />
          <Button type="submit" className="shrink-0">
            <PlusIcon className="h-5 w-5 mr-1" />
            Add
          </Button>
        </form>
      )}
      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-muted p-3 rounded-lg"
            >
              <span className="font-medium text-foreground">{task.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground mr-2">
                  {Math.floor(task.timeSpent / 60)}m {task.timeSpent % 60}s
                </span>
                {isEditable && (
                  <>
                    <Button
                      onClick={() => setCurrentTask(task)}
                      size="sm"
                      variant="outline"
                      className="h-8"
                    >
                      <PlayIcon className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button
                      onClick={() => resetTaskTime(task.id)}
                      size="sm"
                      variant="outline"
                      className="h-8"
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => removeTask(task.id)}
                      size="sm"
                      variant="destructive"
                      className="h-8"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground italic text-center py-4">
          No tasks for this day.{" "}
          {isEditable ? "Add a task to get started!" : ""}
        </p>
      )}
    </div>
  );
}
