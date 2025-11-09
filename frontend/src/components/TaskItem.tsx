import type { TaskType } from "../utils/type";
import markIcon from "../assets/mark-48.png";
import editIcon from "../assets/edit-32.png";
import deleteIcon from "../assets/trash-32.png";

interface TaskItemProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (id: number) => void;
  onMarkDone: (task: TaskType) => void;
}

export default function TaskItem({ task, onEdit, onDelete, onMarkDone }: TaskItemProps) {
  const handleMark = () => {
    if (task.status === "erledigt") return;
    const confirmMark = window.confirm("Mark this task as erledigt?");
    if (confirmMark) onMarkDone(task);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete this task?");
    if (confirmDelete) onDelete(task.id!);
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white 
      border border-gray-200 p-4 rounded-lg hover:shadow-md transition"
    >
      {/* === Left side: Title + Checkbox === */}
      <div className="flex gap-2 items-center w-full sm:w-auto">
        {task.status === "erledigt" ? (
          <img src={markIcon} alt="done" className="w-6 h-6" />
        ) : (
          <input
            type="checkbox"
            checked={false}
            onChange={handleMark}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
        )}

        <div>
          <h3
            className={`text-lg font-semibold text-blue-600 cursor-pointer ${
              task.status === "erledigt" ? "line-through text-gray-400" : ""
            }`}
            onClick={() => onEdit(task)}
          >
            {task.titel}
          </h3>
          {task.beschreibung && (
            <p className="text-sm text-gray-600">{task.beschreibung}</p>
          )}
          <p className="text-xs text-gray-400 capitalize">{task.status}</p>
        </div>
      </div>

      {/* === Right side: Buttons === */}
      <div className="flex gap-2 mt-2 sm:mt-0">
        <img
          src={editIcon}
          alt="edit"
          onClick={() => onEdit(task)}
          className="w-8 h-8 hover:scale-110 transition cursor-pointer"
        />
        <img
          src={deleteIcon}
          alt="delete"
          onClick={handleDelete}
          className="w-8 h-8 hover:scale-110 transition cursor-pointer"
        />
      </div>
    </div>
  );
}
