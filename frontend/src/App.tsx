import { useState, useEffect } from "react";
import type { TaskType } from "./utils/type";
import markIcon from "./assets/mark-48.png";
import editIcon from "./assets/edit-32.png";
import deleteIcon from "./assets/trash-32.png";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [unfinishTask, setUnfinishTask] = useState<TaskType[]>([]);

  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [status, setStatus] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/todos/`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setUnfinishTask(data.filter((e) => e.status !== "erledigt"));
      })
      .catch((err) => console.error("Fetch tasks error:", err));
  }, [API_URL]);

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titel, beschreibung, status }),
      });

      if (!res.ok) {
        setError(`Failed to add task (Error code: ${res.status})`);
        return;
      }

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setError("");
    } catch (err) {
      setError("Adding task failed");
    }

    setTitel("");
    setBeschreibung("");
    setStatus("");
    setSearchQuery("");
    setFilterStatus("");
  };

  const loadUpdate = (task: TaskType) => {
    setTitel(task.titel);
    setBeschreibung(task.beschreibung);
    setStatus(task.status);
    setIsEditing(true);
    setCurrentTaskId(task.id!);
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setTitel("");
    setBeschreibung("");
    setStatus("");
    setCurrentTaskId(null);
  };

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTaskId === null) return;

    try {
      const res = await fetch(`${API_URL}/api/todos/${currentTaskId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titel, beschreibung, status }),
      });

      if (!res.ok) {
        setError(`Update failed (Error code: ${res.status})`);
        return;
      }

      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setUnfinishTask(tasks.filter((t) => t.status !== "erledigt"));
      cancelUpdate();
      setError("");
    } catch {
      setError("Updating failed");
    }
  };

  const deleteHandler = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to DELETE this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/todos/${id}/`, { method: "DELETE" });
      if (res.status === 204) {
        setTasks(tasks.filter((t) => t.id !== id));
        setError("");
      } else {
        setError(`Delete failed (Error code: ${res.status})`);
      }
    } catch {
      setError("Deleting failed");
    }
  };

  const markAsDone = (task: TaskType) => {
    if (task.status === "erledigt") return;
    const confirmErledigt = window.confirm("Are you sure you want to mark ERLEDIGT this task?");
    if (!confirmErledigt) return;
    fetch(`${API_URL}/api/todos/${task.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, status: "erledigt" }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        setUnfinishTask(tasks.filter((t) => t.status !== "erledigt"));
      });
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.titel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.beschreibung.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 sm:p-6 md:p-8 bg-blue-50 border border-blue-100 shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600">
        📝 To-Do Application
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="offen">offen</option>
          <option value="in bearbeitung">in Bearbeitung</option>
          <option value="erledigt">erledigt</option>
        </select>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={addHandler}
        className="flex flex-col sm:flex-row gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Add new task..."
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
          required
          className="px-4 py-2 bg-[#F0F0F0] text-blue-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 flex-1"
        />
        <input
          type="text"
          placeholder="Add Beschreibung..."
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
          className="px-4 py-2 bg-[#F0F0F0] text-blue-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 w-full sm:w-24 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              You have {unfinishTask.length} task(s) to complete
            </h2>
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition"
              >
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  {task.status === "erledigt" ? (
                    <img src={markIcon} className="w-6 h-6" />
                  ) : (
                    <input
                      type="radio"
                      name={`status-${task.id}`}
                      checked={task.status === "erledigt"}
                      onChange={() => markAsDone(task)}
                      className="w-4 h-4 accent-blue-500 cursor-pointer"
                    />
                  )}
                  <h3
                    className={`text-lg font-semibold text-blue-600 cursor-pointer ${task.status === "erledigt" ? "line-through text-gray-400" : ""
                      }`}
                    onClick={() => loadUpdate(task)}
                  >
                    {task.titel}
                  </h3>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <img
                    src={editIcon}
                    onClick={() => loadUpdate(task)}
                    className="w-8 h-8 hover:scale-125 transition cursor-pointer"
                  />
                  <img
                    src={deleteIcon}
                    onClick={() => deleteHandler(task.id!)}
                    className="w-8 h-8 hover:scale-125 transition cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* === Edit Popup Modal === */}
      {isEditing && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-120 relative">
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              Edit Task
            </h2>
            <form onSubmit={updateHandler} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Titel"
                value={titel}
                onChange={(e) => setTitel(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Beschreibung"
                value={beschreibung}
                onChange={(e) => setBeschreibung(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex gap-4 flex-wrap">
                {["offen", "in bearbeitung", "erledigt"].map((opt) => (
                  <label key={opt} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="status"
                      value={opt}
                      checked={status === opt}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    />
                    <span className="capitalize">{opt}</span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={cancelUpdate}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Close icon */}
            <button
              onClick={cancelUpdate}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
