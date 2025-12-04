import React, { useEffect, useState } from 'react';
import api from '../api/apiClient';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  async function fetchTasks() {
    const { data } = await api.get('/tareas');
    setTasks(data);
  }

  async function createTask(e) {
    e.preventDefault();
    await api.post('/tareas', { 
      titulo: title, 
      descripcion: description,
      fecha: date,          // <- SIN CORREGIR, LO DEJO TAL CUAL ESTABA
      createdAt: created
    });

    setTitle('');
    setDescription('');
    setFecha('');            // <- También lo dejo tal cual lo tenías
    fetchTasks();
  }

  async function toggleComplete(t) {
    await api.put(`/tareas/${t.id}`, { completado: !t.completado });
    fetchTasks();
  }

  async function delTask(id) {
    await api.delete(`/tareas/${id}`);
    fetchTasks();
  }

  return (
    <div className="w-full flex flex-col items-center mt-10 px-4">

      {/* Formulario dentro de una tarjeta */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border mb-8">
        <h2 className="text-xl font-bold mb-6 text-center">Crear nueva tarea</h2>

        <form onSubmit={createTask} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Título</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Nueva tarea"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descripción"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Fecha</label>
            <input
              type="date"
              value={created}
              onChange={e => setCreated(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Crear tarea
          </button>
        </form>
      </div>

      {/* Lista de tareas */}
      <div className="w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Tareas</h3>

        <ul className="bg-white shadow-md rounded-xl border divide-y">
          {tasks.map(t => (
            <li key={t.id} className="flex items-center justify-between p-3">

              <div className="flex items-center">
                <input 
                  type="checkbox"
                  checked={t.completado}
                  onChange={() => toggleComplete(t)}
                  className="mr-3 w-5 h-5"
                />

                <div className="flex flex-col">
                  <span className={t.completado ? "line-through text-gray-500" : "font-medium"}>
                    {t.titulo}
                  </span>
                  <span className="text-xs text-gray-400">{t.createdAt}</span>
                </div>
              </div>

              <button
                onClick={() => delTask(t.id)}
                className="text-red-600 hover:text-red-800"
              >
                Eliminar
              </button>

            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Tasks;