import type { TaskType } from "../utils/type";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: TaskType[];
  onEdit: (task: TaskType) => void;
  onDelete: (id: number) => void;
  onMarkDone: (task: TaskType) => void;
}

export default function TaskList({ tasks, onEdit, onDelete, onMarkDone }: TaskListProps) {
  if (tasks.length === 0) return <p className="text-gray-500">No tasks found.</p>;
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onMarkDone={onMarkDone} />
      ))}
    </div>
  );
}
