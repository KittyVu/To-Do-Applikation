export type TaskType = {
  id: number;
  titel: string;
  beschreibung: string;
  status: string;
};

export type TasksContextType = {
  tasks: TaskType[];
  addTask: (titel: string, beschreibung: string, status: string) => void;
  updateTask: (id: number, updated: Partial<TaskType>) => void;
  deleteTask: (id: number) => void;

  // search/filter
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;

  // editing state
  editingTask: TaskType | null;
  setEditingTask: (task: TaskType | null) => void;
  editTitel: string;
  setEditTitel: (v: string) => void;
  editBeschreibung: string;
  setEditBeschreibung: (v: string) => void;
  editStatus: string;
  setEditStatus: (v: string) => void;
}