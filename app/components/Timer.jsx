"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { PlayIcon, PauseIcon, MonitorStopIcon as StopIcon } from "lucide-react";

export default function Timer({ currentTask, updateTaskTime }) {
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

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    if (currentTask) {
      updateTaskTime(currentTask.id, time);
    }
    setTime(0);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        {currentTask ? currentTask.name : "No task selected"}
      </h2>
      <div className="text-4xl font-mono mb-4">
        {Math.floor(time / 60)
          .toString()
          .padStart(2, "0")}
        :{(time % 60).toString().padStart(2, "0")}
      </div>
      <div className="space-x-2">
        <Button onClick={handleStart} disabled={!currentTask || isRunning}>
          <PlayIcon className="h-5 w-5 mr-1" />
          Start
        </Button>
        <Button onClick={handlePause} disabled={!isRunning}>
          <PauseIcon className="h-5 w-5 mr-1" />
          Pause
        </Button>
        <Button
          onClick={handleStop}
          disabled={!currentTask || (!isRunning && time === 0)}
        >
          <StopIcon className="h-5 w-5 mr-1" />
          Stop
        </Button>
      </div>
    </div>
  );
}
