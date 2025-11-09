import React from "react";

interface TaskFormProps {
  titel: string;
  beschreibung: string;
  onTitelChange: (v: string) => void;
  onBeschreibungChange: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TaskForm({
  titel,
  beschreibung,
  onTitelChange,
  onBeschreibungChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        type="text"
        placeholder="Add new task..."
        value={titel}
        onChange={(e) => onTitelChange(e.target.value)}
        required
        className="px-4 py-2 bg-[#F0F0F0] text-blue-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 flex-1"
      />
      <input
        type="text"
        placeholder="Add Beschreibung..."
        value={beschreibung}
        onChange={(e) => onBeschreibungChange(e.target.value)}
        className="px-4 py-2 bg-[#F0F0F0] text-blue-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 flex-1"
      />
      <button
        type="submit"
        className="bg-blue-500 w-full sm:w-24 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}

