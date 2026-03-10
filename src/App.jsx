import { useState } from 'react';
import Login from './components/login';
import MenuConfig from './components/menuconfig';
import TestView from './components/testview';
import Results from './components/results';

function App() {
  const [fase, setFase] = useState('login'); // 'login', 'menu', 'test', 'resultados'
  const [config, setConfig] = useState({ filtroTitulo: 'Todos', numPreguntas: 10 });
  const [testData, setTestData] = useState({ preguntas: [], puntuacion: 0 });

  return (
    <div className="app-container">
      {fase === 'login' && <Login onLogin={() => setFase('menu')} />}
      {fase === 'menu' && <MenuConfig onStart={(c) => { setConfig(c); setFase('test'); }} />}
      {fase === 'test' && <TestView config={config} onFinish={(score) => { setTestData(score); setFase('resultados'); }} />}
      {fase === 'resultados' && <Results score={testData} onRestart={() => setFase('menu')} />}
    </div>
  );
}

export default App;