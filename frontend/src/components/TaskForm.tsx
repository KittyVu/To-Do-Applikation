import { useState } from "react";
import { useTasksContext } from "../context/TaskContext";

export default function TaskForm() {
  const { addTask } = useTasksContext(); // get from Context
  const [titel, setTitel] = useState("");
  const [beschreibung, setBeschreibung] = useState("");
  const [status, setStatus] = useState("offen");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(titel, beschreibung, status);
    // return empty input
    setTitel("");
    setBeschreibung("");
    setStatus("offen");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        type="text"
        placeholder="Neue Aufgabe hinzufügen..."
        value={titel}
        onChange={(e) => setTitel(e.target.value)}
        required
        className="flex-1 px-4 py-2 bg-[#F0F0F0] text-blue-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Beschreibung hinzufügen..."
        value={beschreibung}
        onChange={(e) => setBeschreibung(e.target.value)}
        className="flex-1 px-4 py-2 bg-[#F0F0F0] text-blue-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 w-full sm:w-24 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Hinzufügen
      </button>
    </form>
  );
}
