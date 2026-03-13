import { useState } from 'react';
import Login from './components/login';
import Home from './components/home';
import MenuConfig from './components/menuconfig';
import TestView from './components/testview';
import Results from './components/results';
import BackButton from './components/backbutton';
import Perfil from './components/perfil';
 
function App() {
  const [fase, setFase] = useState('login');
  const [config, setConfig] = useState({});
  const [testData, setTestData] = useState({ score: 0, total: 0 });
 
  return (
    <div className="app-container">
 
      {fase === 'login' && (
        <Login onLogin={() => setFase('home')} />
      )}
 
      {fase === 'home' && (
        <Home onSelectMode={(mode) => {
          if (mode === 'titulos')  setFase('menu');
          if (mode === 'perfil')   setFase('perfil');
          if (mode === 'examen')   setFase('config_examen');
          if (mode === 'aleatorio') setFase('config_aleatorio');
        }} />
      )}
 
      {fase === 'menu' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig onStart={(c) => { setConfig(c); setFase('test'); }} />
        </>
      )}
 
      {/* Simulacro de examen: configuración dedicada */}
      {fase === 'config_examen' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig
            mode="examen"
            onStart={(c) => { setConfig({ ...c, modo: 'examen' }); setFase('test'); }}
          />
        </>
      )}
 
      {/* Preguntas aleatorias */}
      {fase === 'config_aleatorio' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig
            mode="aleatorio"
            onStart={(c) => { setConfig({ ...c, modo: 'aleatorio' }); setFase('test'); }}
          />
        </>
      )}
 
      {fase === 'perfil' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <Perfil />
        </>
      )}
 
      {fase === 'test' && (
        <TestView
          config={config}
          onFinish={(score) => { setTestData(score); setFase('resultados'); }}
        />
      )}
 
      {fase === 'resultados' && (
        <Results
          score={testData}
          onRestart={() => setFase('home')}
          onRepeat={() => setFase('test')}
        />
      )}
 
    </div>
  );
}
 
export default App;