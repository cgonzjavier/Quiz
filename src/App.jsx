import { useState } from 'react';
import styles from './styles/Global.css';
import Login from './components/login';
import Home from './components/home';
import MenuConfig from './components/menuconfig';
import TestView from './components/testview';
import Results from './components/results';
import BackButton from './components/backbutton';
import Perfil from './components/perfil';

function App() {
  // Estados para controlar la navegación y los datos
  const [fase, setFase] = useState('login'); 
  const [config, setConfig] = useState({});
  const [testData, setTestData] = useState({ score: 0, total: 0 });

  return (
    <div className={styles.appContainer}>
      {fase === 'login' && <Login onLogin={() => setFase('home')} />}
      
      {fase === 'home' && (
        <Home onSelectMode={(mode) => {
          if (mode === 'titulos') setFase('menu');
          if (mode === 'perfil') setFase('perfil');
          if (mode === 'examen') setFase('config_examen');
          if (mode === 'aleatorio') { /* Lógica pendiente */ }
        }} />
      )}

      {fase === 'menu' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig onStart={(c) => { setConfig(c); setFase('test'); }} />
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
          onFinish={(score) => { 
            setTestData(score); 
            setFase('resultados'); 
          }} 
        />
      )}

      {fase === 'resultados' && (
        <Results 
          score={testData} 
          onRestart={() => setFase('home')} 
        />
      )}
      
      {fase === 'test' && (
        <TestView 
          config={config} 
          onFinish={(score) => { setTestData(score); setFase('resultados'); }} 
        />
      )}

      {fase === 'resultados' && (
        <Results score={testData} onRestart={() => setFase('home')} />
      )}
    </div>
  );
}

export default App;