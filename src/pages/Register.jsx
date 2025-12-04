import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await api.post('/auth/register', { username, password });
      navigate('/login');
    } catch (error) {
      setErr(error.response?.data || 'Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Crear cuenta</h2>
        
        {err && <div className="mb-2 text-red-600">{err}</div>}

        <input 
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Usuario"
          className="w-full mb-2 p-2 border rounded"
        />

        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Registrarse
        </button>

        <p className="mt-3 text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          <span 
            onClick={() => navigate('/')} 
            className="text-blue-600 cursor-pointer"
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  );
}