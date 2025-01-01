"use client";

import dynamic from "next/dynamic";

const TaskTimerApp = dynamic(() => import("./TaskTimerApp"), { ssr: false });

export default function ClientTaskTimerApp() {
  return <TaskTimerApp />;
}
