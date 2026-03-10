import { useState, useEffect } from 'react';
import { preguntasLey } from '../data/preguntas';

export default function TestView({ config, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [test, setTest] = useState([]);

  useEffect(() => {
    // Definimos la lógica dentro del efecto para evitar errores de compilación
    const prepararTest = () => {
      const list = config.filtroTitulo === 'Todos' 
        ? [...preguntasLey] 
        : preguntasLey.filter(p => p.titulo === config.filtroTitulo);
      
      const aleatorias = list
        .sort(() => 0.5 - Math.random())
        .slice(0, config.numPreguntas);
      
      setTest(aleatorias);
    };

    prepararTest();
  }, [config.filtroTitulo, config.numPreguntas]); // Dependencias explícitas

  // Función usada en el JSX
  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === test[index].correcta) setScore(s => s + 1);
  };

  if (test.length === 0) return <div>Cargando preguntas...</div>;

  const p = test[index];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">{p.pregunta}</h2>
        {p.opciones.map((op, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)} // Aquí es donde se "lee" la función
            className={`w-full p-4 mb-2 border rounded-xl transition-all ${
              selected === i 
                ? (i === p.correcta ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500") 
                : "hover:bg-gray-50"
            }`}
          >
            {op}
          </button>
        ))}
        {selected !== null && (
          <button 
            onClick={() => {
              if (index + 1 < test.length) {
                setIndex(index + 1);
                setSelected(null);
              } else {
                onFinish({ score: selected === p.correcta ? score : score, total: test.length });
              }
            }} 
            className="mt-4 w-full bg-black text-white py-3 rounded-xl"
          >
            {index + 1 === test.length ? "Ver Resultados" : "Siguiente"}
          </button>
        )}
      </div>
    </div>
  );
}