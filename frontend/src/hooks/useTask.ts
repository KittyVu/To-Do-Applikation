import { useState, useEffect } from "react";
import type { TaskType } from "../utils/type";

export default function useTasks(apiUrl: string) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/api/todos/`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(() => setError("Failed to fetch tasks"));
  }, [apiUrl]);

  const addTask = async (titel: string, beschreibung: string, status: string) => {
    const res = await fetch(`${apiUrl}/api/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titel, beschreibung, status }),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
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

  return { tasks, setTasks, error, setError, addTask, updateTask, deleteTask };
}
