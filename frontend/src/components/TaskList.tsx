import { useTasksContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks, searchQuery, filterStatus } = useTasksContext();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.beschreibung.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  if (filteredTasks.length === 0) return <p className="text-gray-500">No tasks found.</p>;

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
