import { TasksProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskEdit from "./components/TaskEdit";
import SearchFilter from "./components/SearchFilter";
import { useTasksContext } from "./context/TaskContext";

function AppContent() {
  const { tasks } = useTasksContext();
  const unfinishedCount = tasks.filter((t) => t.status !== "erledigt").length;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-blue-50 border border-blue-100 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">📝 To-Do Application</h1>

      <SearchFilter />

      <TaskForm />

      <h2 className="text-xl font-semibold mb-4">You have {unfinishedCount} task(s) to complete</h2>
      
      <TaskList />

      <TaskEdit />
    </div>
  );
}

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <TasksProvider apiUrl={API_URL}>
      <AppContent />
    </TasksProvider>
  );
}
