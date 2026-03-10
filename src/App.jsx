import { useState } from 'react';
import Login from './components/login';
import Home from './components/home';
import MenuConfig from './components/menuconfig';
import TestView from './components/testview';
import Results from './components/results';

function App() {
  // Añadimos 'home' a tus fases
  const [fase, setFase] = useState('login'); 
  const [config, setConfig] = useState({});
  const [testData, setTestData] = useState({ score: 0, total: 0 });

  return (
    <div className="app-container">
      {fase === 'login' && <Login onLogin={() => setFase('home')} />}
      
      {fase === 'home' && (
        <Home onSelectMode={(mode) => {
          if (mode === 'titulos') setFase('menu');
          if (mode === 'perfil') setFase('perfil'); // Nueva fase para el perfil
          if (mode === 'examen') setFase('config_examen'); // Nueva fase de config tiempo
          if (mode === 'aleatorio') { /* Aquí iría tu lógica aleatoria */ }
        }} />
      )}
      
      {fase === 'menu' && <MenuConfig onStart={(c) => { setConfig(c); setFase('test'); }} />}
      {fase === 'test' && <TestView config={config} onFinish={(score) => { setTestData(score); setFase('resultados'); }} />}
      {fase === 'resultados' && <Results score={testData} onRestart={() => setFase('home')} />}
    </div>
  );
}

export default App;