"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PlayIcon,
  PauseIcon,
  MonitorStopIcon as StopIcon,
  RefreshCwIcon,
} from "lucide-react";

export default function Timer({ currentTask, updateTaskTime, isEditable }) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setTime(0);
    setIsRunning(false);
  }, [currentTask]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    if (currentTask) {
      updateTaskTime(currentTask.id, time);
    }
    setTime(0);
  };
  const handleReset = () => setTime(0);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold text-foreground text-center mb-4">
        {currentTask ? currentTask.name : "No task selected"}
      </h2>
      <div className="text-5xl font-mono text-center text-primary mb-6 tabular-nums">
        {formatTime(time)}
      </div>
      {isEditable && (
        <div className="flex justify-center space-x-3">
          <Button
            onClick={handleStart}
            disabled={!currentTask || isRunning}
            className="w-24"
          >
            <PlayIcon className="h-4 w-4 mr-2" />
            Start
          </Button>
          <Button onClick={handlePause} disabled={!isRunning} className="w-24">
            <PauseIcon className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={handleStop}
            disabled={!currentTask || (!isRunning && time === 0)}
            className="w-24"
          >
            <StopIcon className="h-4 w-4 mr-2" />
            Stop
          </Button>
          <Button
            onClick={handleReset}
            disabled={!currentTask || time === 0}
            variant="outline"
            className="w-24"
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
