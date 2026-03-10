import { useState, useMemo } from 'react';
import { preguntasLey } from '../data/preguntas';

export default function MenuConfig({ onStart }) {
  const [filtroTitulo, setFiltroTitulo] = useState('Todos');
  const [numPreguntasReq, setNumPreguntasReq] = useState(10);

  const titulos = useMemo(() => ['Todos', ...new Set(preguntasLey.map(p => p.titulo))], []);
  const filtradas = useMemo(() => filtroTitulo === 'Todos' ? preguntasLey : preguntasLey.filter(p => p.titulo === filtroTitulo), [filtroTitulo]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Configura tu Sesión</h2>
        <select onChange={(e) => setFiltroTitulo(e.target.value)} className="w-full p-3 mb-4 border rounded-xl">
          {titulos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="range" min="5" max={filtradas.length} value={numPreguntasReq} onChange={(e) => setNumPreguntasReq(Number(e.target.value))} className="w-full mb-6" />
        <button onClick={() => onStart({ filtroTitulo, numPreguntas: numPreguntasReq })} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">¡Empezar Test!</button>
      </div>
    </div>
  );
}