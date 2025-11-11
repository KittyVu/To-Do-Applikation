import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import { TasksProvider } from './context/TaskContext.tsx'

const API_URL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TasksProvider apiUrl={API_URL}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </TasksProvider>
  </BrowserRouter>
)
