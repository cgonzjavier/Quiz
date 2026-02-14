import { useState } from 'react'
import { preguntasLey } from './data/preguntas'

// Aquí defines las credenciales de tu amigo
const CREDENCIALES_VALIDAS = {
  usuario: "admin",
  password: "ley" 
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)

  // Estados del Test
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [respondido, setRespondido] = useState(false)
  const [seleccion, setSeleccion] = useState(null)

  // Función de Login
  const handleLogin = (e) => {
    e.preventDefault()
    if (user === CREDENCIALES_VALIDAS.usuario && pass === CREDENCIALES_VALIDAS.password) {
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  // --- LÓGICA DEL TEST (Igual que antes) ---
  const manejarRespuesta = (indice) => {
    if (respondido) return
    setSeleccion(indice)
    setRespondido(true)
    if (indice === preguntasLey[preguntaActual].correcta) setPuntuacion(puntuacion + 1)
  }

  const siguientePregunta = () => {
    const siguiente = preguntaActual + 1
    if (siguiente < preguntasLey.length) {
      setPreguntaActual(siguiente)
      setRespondido(false)
      setSeleccion(null)
    } else {
      setMostrarResultado(true)
    }
  }

  // 1. VISTA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Acceso Privado</h2>
          <div className="space-y-4">
            <input 
              type="text" placeholder="Usuario" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setUser(e.target.value)}
            />
            <input 
              type="password" placeholder="Contraseña" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setPass(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">Credenciales incorrectas</p>}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Entrar
            </button>
          </div>
        </form>
      </div>
    )
  }

  // 2. VISTA DE RESULTADOS
  if (mostrarResultado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold mb-4">¡Test Finalizado!</h2>
          <p className="text-5xl font-black text-blue-600 mb-6">{puntuacion} / {preguntasLey.length}</p>
          <button onClick={() => window.location.reload()} className="w-full bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-all">
            Volver a empezar
          </button>
        </div>
      </div>
    )
  }

  // 3. VISTA DEL TEST
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full">
        {/* Barra de progreso visual */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${((preguntaActual + 1) / preguntasLey.length) * 100}%` }}
          ></div>
        </div>

        <div className="mb-4 flex justify-between items-center text-sm">
          <span className="text-gray-500">Pregunta {preguntaActual + 1} de {preguntasLey.length}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">Aciertos: {puntuacion}</span>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-800 leading-tight">
          {preguntasLey[preguntaActual].pregunta}
        </h2>

        <div className="space-y-3">
          {preguntasLey[preguntaActual].opciones.map((opcion, i) => (
            <button
              key={i}
              onClick={() => manejarRespuesta(i)}
              disabled={respondido}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                respondido 
                  ? i === preguntasLey[preguntaActual].correcta 
                    ? "border-green-500 bg-green-50 text-green-700 shadow-sm" 
                    : i === seleccion ? "border-red-500 bg-red-50 text-red-700" : "border-gray-100 text-gray-400"
                  : "border-gray-100 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 font-bold opacity-50">{String.fromCharCode(65 + i)})</span>
                {opcion}
              </div>
            </button>
          ))}
        </div>

        {respondido && (
          <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in duration-500">
            <h4 className="text-slate-800 font-bold mb-2 flex items-center">
              <span className="mr-2">💡</span> Explicación legal:
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {preguntasLey[preguntaActual].explicacion}
            </p>
            <button 
              onClick={siguientePregunta}
              className="mt-6 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
            >
              Siguiente pregunta
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App