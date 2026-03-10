export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Acceso Privado</h2>
        <input type="text" placeholder="Usuario" className="w-full p-3 mb-4 border rounded-lg outline-none" />
        <input type="password" placeholder="Contraseña" className="w-full p-3 mb-6 border rounded-lg outline-none" />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Entrar</button>
      </form>
    </div>
  );
}