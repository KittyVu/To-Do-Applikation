import type { TaskType } from "../utils/type";
import { useTasksContext } from "../context/TaskContext";
import markIcon from "../assets/mark-48.png";
import editIcon from "../assets/edit-32.png";
import deleteIcon from "../assets/trash-32.png";

export default function TaskItem({ task }: { task: TaskType }) {
  const { deleteTask, updateTask, setEditingTask, setEditTitel, setEditBeschreibung, setEditStatus } = useTasksContext();

  const handleMark = () => {
    if (task.status !== "erledigt" && window.confirm("Mark this task as erledigt?")) {
      updateTask(task.id!, { ...task, status: "erledigt" });
    }
  };

  const handleEdit = () => {
    setEditingTask(task);
    setEditTitel(task.titel);
    setEditBeschreibung(task.beschreibung);
    setEditStatus(task.status);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) deleteTask(task.id!);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition">
      <div className="flex gap-2 items-center w-full sm:w-auto">
        {task.status === "erledigt" ? (
          <img src={markIcon} alt="done" className="w-6 h-6" />
        ) : (
          <input type="checkbox" className="w-4 h-4 accent-blue-500 cursor-pointer" onChange={handleMark} />
        )}
        <div>
          <h3
            className={`text-lg font-semibold text-blue-600 cursor-pointer ${
              task.status === "erledigt" ? "line-through text-gray-400" : ""
            }`}
            onClick={handleEdit}
          >
            {task.titel}
          </h3>
        </div>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <img src={editIcon} alt="edit" className="w-8 h-8 hover:scale-110 cursor-pointer" onClick={handleEdit} />
        <img src={deleteIcon} alt="delete" className="w-8 h-8 hover:scale-110 cursor-pointer" onClick={handleDelete} />
      </div>
    </div>
  );
}
