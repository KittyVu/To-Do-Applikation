import { createContext, useContext, useState, useEffect } from "react";
import type { TaskType } from "../utils/type";
import type { ReactNode } from "react";
import type { TasksContextType } from "../utils/type";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasksContext must be used within TasksProvider");
  return context;
};

export const TasksProvider = ({ apiUrl, children }: { apiUrl: string; children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // === Editing state ===
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [editTitel, setEditTitel] = useState("");
  const [editBeschreibung, setEditBeschreibung] = useState("");
  const [editStatus, setEditStatus] = useState("offen");

  useEffect(() => {
    fetch(`${apiUrl}/api/todos/`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, [apiUrl]);

  const addTask = async (titel: string, beschreibung: string, status: string) => {
    const res = await fetch(`${apiUrl}/api/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titel, beschreibung, status }),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setSearchQuery("");
    setFilterStatus("");
  };

  const updateTask = async (id: number, updated: Partial<TaskType>) => {
    const res = await fetch(`${apiUrl}/api/todos/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const updatedTask = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  const deleteTask = async (id: number) => {
    await fetch(`${apiUrl}/api/todos/${id}/`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        editingTask,
        setEditingTask,
        editTitel,
        setEditTitel,
        editBeschreibung,
        setEditBeschreibung,
        editStatus,
        setEditStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
