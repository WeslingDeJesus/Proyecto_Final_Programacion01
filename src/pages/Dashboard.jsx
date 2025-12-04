import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-16">
      <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">Dashboard</h1>

      <p className="mb-6 text-white text-center">
        Bienvenido al panel principal. Desde aquí puedes navegar a las distintas
        secciones del sistema.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <Link
          to="/tasks"
          className="p-6 rounded-xl shadow  bg-white hover:bg-red-100 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Tareas</h2>
          <p>Gestiona tus tareas: crear, editar y eliminar.</p>
        </Link>

        <Link
          to="/reports"
          className="p-6 rounded-xl shadow bg-white hover:bg-red-100 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Reportes</h2>
          <p>Visualiza reportes y estadísticas.</p>
        </Link>

        <Link
          to="/"
          className="p-6 rounded-xl shadow bg-white hover:bg-red-100 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Salir</h2>
          <p>Volver al login.</p>
        </Link>
      </div>
    </div>
  );
}