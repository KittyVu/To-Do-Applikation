import { useTasksContext } from "../context/TaskContext";

export default function SearchFilter() {
  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus } = useTasksContext();

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Suche nach Titel oder Beschreibung..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Alle</option>
        <option value="offen">offen</option>
        <option value="in bearbeitung">in Bearbeitung</option>
        <option value="erledigt">erledigt</option>
      </select>
    </div>
  );
}
