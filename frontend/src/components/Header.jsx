import { Link, useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../api/apiClient";

export default function Header() {
  const location = useLocation();
  if (location.pathname === "/") return null; // Oculta en login

  const navigate = useNavigate();

  const logout = () => {
    setToken(null); // elimina token + localStorage
    navigate("/");
  };

  return (
    <header className="bg-neutral-900 w-full text-white px-6 py-4 flex items-center justify-between shadow">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-red-600 rounded-full mr-3" />
        <h1 className="font-bold text-xl">MAAT TaskBuddy</h1>
      </div>

      <nav className="flex gap-6 text-sm">
        <Link to="/dashboard" className="hover:text-red-400">Dashboard</Link>
        <Link to="/tasks" className="hover:text-red-400">Tareas</Link>
        <Link to="/reports" className="hover:text-red-400">Reportes</Link>

        <button
          onClick={logout}
          className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          Salir
        </button>
      </nav>
    </header>
  );
}