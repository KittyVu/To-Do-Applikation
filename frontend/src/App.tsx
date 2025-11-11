import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import SearchFilter from "./components/SearchFilter";
import { useTasksContext } from "./context/TaskContext";

export default function App() {
  const { tasks } = useTasksContext();
  const unfinishedCount = tasks.filter((t) => t.status !== "erledigt").length;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-blue-50 border border-blue-100 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">📝 To-Do Applikation</h1>

      <SearchFilter />

      <TaskForm />

      <h2 className="text-xl font-semibold mb-4">Sie haben {unfinishedCount} Aufgabe(n) zu erledigen</h2>
      
      <TaskList />

      <TaskEdit />
    </div>
  );
}

