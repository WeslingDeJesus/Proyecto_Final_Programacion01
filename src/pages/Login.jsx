import React, { useState } from 'react';
import api, { setToken } from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

 function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { username, password });
      console.log("RESPUESTA LOGIN:", data);
      setToken(data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(error.response?.data || 'Error de login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
        {err && <div className="mb-2 text-red-600">{err}</div>}
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario"
               className="w-full mb-2 p-2 border rounded"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password"
               className="w-full mb-4 p-2 border rounded"/>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>

         <p className="mt-3 text-sm text-center">
          ¿No tienes cuenta?{' '}
          <span 
            onClick={() => navigate('/register')} 
            className="text-blue-600 cursor-pointer"
          >
            Crear cuenta
          </span>
        </p>
      </form>
    </div>
  );
}
export default Login