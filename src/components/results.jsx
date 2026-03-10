export default function Results({ score, onRestart }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2">¡Completado!</h2>
        <p className="text-4xl font-black text-blue-600 mb-6">{Math.round((score.score / score.total) * 100)}%</p>
        <button onClick={onRestart} className="w-full bg-blue-600 text-white py-3 rounded-xl">Volver al menú</button>
      </div>
    </div>
  );
}