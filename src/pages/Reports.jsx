import React, { useState } from 'react';
import api from '../api/apiClient';

 function Reports() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [format, setFormat] = useState('excel');

  const generate = async () => {
    const res = await api.get(`/reportes/general?from=${from || ''}&to=${to || ''}&format=${format}`, {
      responseType: 'blob'
    });
    const disposition = res.headers['content-disposition'] || '';
    const filename = disposition.split('filename=')[1] || (format === 'excel' ? 'reporte.xlsx' : 'reporte.csv');
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename.replace(/"/g,''));
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="w-full flex justify-center mt-10">
      {/* Card del formulario */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md border">

        <h2 className="text-xl font-bold mb-6 text-center">
          Generar reporte
        </h2>

        {/* Campo Desde */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Desde</label>
          <input
            type="date"
            value={from}
            onChange={e=>setFrom(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Hasta */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Hasta</label>
          <input
            type="date"
            value={to}
            onChange={e=>setTo(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo formato */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Formato</label>
          <select
            value={format}
            onChange={e=>setFormat(e.target.value)}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        {/* Botón */}
        <button
          onClick={generate}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Generar y descargar
        </button>

      </div>
    </div>
  );
}

export default Reports;