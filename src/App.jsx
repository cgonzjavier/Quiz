import { useState, useMemo } from 'react'
import { preguntasLey } from './data/preguntas'

const CREDENCIALES_VALIDAS = { usuario: "guille", password: "ley" }

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [fase, setFase] = useState('menu') // 'menu', 'test', 'resultados'
  
  // Estados de configuración
  const [filtroTitulo, setFiltroTitulo] = useState('Todos')
  const [numPreguntasReq, setNumPreguntasReq] = useState(10)
  
  // Estados del Test
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState([])
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [respondido, setRespondido] = useState(false)
  const [seleccion, setSeleccion] = useState(null)

  // Extraer títulos únicos para el menú
  const titulosDisponibles = useMemo(() => {
    return ['Todos', ...new Set(preguntasLey.map(p => p.titulo))];
  }, []);

  const iniciarTest = () => {
    // 1. Filtrar por título
    let filtradas = filtroTitulo === 'Todos' 
      ? [...preguntasLey] 
      : preguntasLey.filter(p => p.titulo === filtroTitulo);
    
    // 2. Mezclar (Randomize) y limitar número
    const barajadas = filtradas.sort(() => 0.5 - Math.random())
    const seleccion = barajadas.slice(0, numPreguntasReq)
    
    setPreguntasSeleccionadas(seleccion)
    setPreguntaActual(0)
    setPuntuacion(0)
    setRespondido(false)
    setSeleccion(null)
    setFase('test')
  }

  // --- COMPONENTE: LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Acceso Privado</h2>
          <input type="text" placeholder="Usuario" className="w-full p-3 mb-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Contraseña" className="w-full p-3 mb-6 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Entrar</button>
        </form>
      </div>
    )
  }

  // --- COMPONENTE: MENÚ DE CONFIGURACIÓN ---
  if (fase === 'menu') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-8 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Configura tu Sesión</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Título del Código Penal</label>
            <select 
              value={filtroTitulo} 
              onChange={(e) => setFiltroTitulo(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              {titulosDisponibles.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Número de preguntas: {numPreguntasReq}</label>
            <input 
              type="range" min="5" max={preguntasLey.length} step="5"
              value={numPreguntasReq}
              onChange={(e) => setNumPreguntasReq(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <button 
            onClick={iniciarTest}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            ¡Empezar Test!
          </button>
        </div>
      </div>
    )
  }

  // --- COMPONENTE: TEST ---
  if (fase === 'test') {
    const p = preguntasSeleccionadas[preguntaActual]
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full">
           {/* Barra de progreso */}
           <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-500" 
              style={{ width: `${((preguntaActual + 1) / preguntasSeleccionadas.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-medium">{p.titulo}</span>
            <span className="text-gray-400">Pregunta {preguntaActual + 1} / {preguntasSeleccionadas.length}</span>
          </div>

          <h2 className="text-xl font-semibold mb-8 text-gray-800 leading-snug">{p.preguntas}</h2>

          <div className="space-y-3">
            {p.opciones.map((op, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (!respondido) {
                    setSeleccion(i);
                    setRespondido(true);
                    if (i === p.correcta) setPuntuacion(puntuacion + 1);
                  }
                }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  respondido 
                    ? i === p.correcta ? "border-green-500 bg-green-50" : i === seleccion ? "border-red-500 bg-red-50" : "border-gray-50 opacity-50"
                    : "border-gray-100 hover:border-blue-400 hover:bg-blue-50 shadow-sm"
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          {respondido && (
            <div className="mt-8">
              <button 
                onClick={() => {
                  if (preguntaActual + 1 < preguntasSeleccionadas.length) {
                    setPreguntaActual(preguntaActual + 1);
                    setRespondido(false);
                    setSeleccion(null);
                  } else {
                    setFase('resultados');
                  }
                }}
                className="mt-4 w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-900 shadow-xl transition-all"
              >
                {preguntaActual + 1 === preguntasSeleccionadas.length ? "Ver resultados" : "Continuar"}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // --- COMPONENTE: RESULTADOS ---
  if (fase === 'resultados') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-sm w-full">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Completado!</h2>
          <p className="text-gray-500 mb-6">Has acertado {puntuacion} de {preguntasSeleccionadas.length}</p>
          <div className="text-4xl font-black text-blue-600 mb-8">
            {Math.round((puntuacion / preguntasSeleccionadas.length) * 100)}%
          </div>
          <button 
            onClick={() => setFase('menu')}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Volver al menú
          </button>
        </div>
      </div>
    )
  }
}

export default App