import { useTasksContext } from "../context/TaskContext";

export default function TaskEdit() {
  const {
    editingTask,
    setEditingTask,
    editTitel,
    setEditTitel,
    editBeschreibung,
    setEditBeschreibung,
    editStatus,
    setEditStatus,
    updateTask,
  } = useTasksContext();  // get from Context

  if (!editingTask) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // get this function from Context
    updateTask(editingTask.id!, {
      titel: editTitel,
      beschreibung: editBeschreibung,
      status: editStatus,
    });
    handleCancel();
  };

  const handleCancel = () => {
    setEditingTask(null);
    setEditTitel("");
    setEditBeschreibung("");
    setEditStatus("offen");
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-120 relative">
        <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">Aufgabe bearbeiten</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Titel"
            value={editTitel}
            onChange={(e) => setEditTitel(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Beschreibung"
            value={editBeschreibung}
            onChange={(e) => setEditBeschreibung(e.target.value)}
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
                  checked={editStatus === opt}
                  onChange={(e) => setEditStatus(e.target.value)}
                  required
                />
                <span className="capitalize">{opt}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Speichern
            </button>
            <button type="button" onClick={handleCancel} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer">
              Stornieren
            </button>
          </div>
        </form>

        <button onClick={handleCancel} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">
          ✕
        </button>
      </div>
    </div>
  );
}
