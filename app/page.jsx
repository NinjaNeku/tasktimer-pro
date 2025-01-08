import TaskTimerApp from "./components/TaskTimerApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-foreground mb-6">
          TaskTimer Pro
        </h1>
        <TaskTimerApp />
      </div>
    </div>
  );
}
