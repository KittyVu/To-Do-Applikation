import { useTasksContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, searchQuery, filterStatus } = useTasksContext();
  
  // if no search no filter, return full array
  const filteredTasks = tasks.filter((task) => {
     // if having search
    const matchesSearch =
      task.titel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.beschreibung.toLowerCase().includes(searchQuery.toLowerCase());

    // if having filter
    const matchesFilter = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  if (filteredTasks.length === 0) return <p className="text-gray-500">Keine Aufgaben gefunden.</p>;

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
