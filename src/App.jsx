import { useState, useEffect } from 'react';
import Login from './components/login';
import Registro from './components/registro';
import Home from './components/home';
import MenuConfig from './components/menuconfig';
import TestView from './components/testview';
import Results from './components/results';
import BackButton from './components/backbutton';
import Perfil from './components/perfil';
import { supabase } from './lib/supabaseClient';

function App() {
  const [fase, setFase] = useState(null); // null = comprobando sesión
  const [config, setConfig] = useState({});
  const [testData, setTestData] = useState({ score: 0, total: 0 });

  useEffect(() => {
    // Comprueba si hay sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setFase(session ? 'home' : 'login');
    });

    // Escucha cambios de sesión (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setFase('login');
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setFase('login');
  };

  // Pantalla de carga mientras se comprueba la sesión
  if (fase === null) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Cargando…</span>
      </div>
    );
  }

  return (
    <div className="app-container">

      {fase === 'login' && (
        <Login
          onLogin={() => setFase('home')}
          onShowRegistro={() => setFase('registro')}
        />
      )}

      {fase === 'registro' && (
        <Registro
          onRegistrado={() => setFase('home')}
          onShowLogin={() => setFase('login')}
        />
      )}

      {fase === 'home' && (
        <Home onSelectMode={(mode) => {
          if (mode === 'titulos')   setFase('menu');
          if (mode === 'perfil')    setFase('perfil');
          if (mode === 'examen')    setFase('config_examen');
          if (mode === 'aleatorio') setFase('config_aleatorio');
        }} />
      )}

      {fase === 'menu' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig onStart={(c) => { setConfig(c); setFase('test'); }} />
        </>
      )}

      {fase === 'config_examen' && (
        <>
          <BackButton onClick={() => setFase('home')} />
          <MenuConfig
            mode="examen"
            onStart={(c) => { setConfig({ ...c, modo: 'examen' }); setFase('test'); }}
          />
        </>
      )}

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
          <Perfil onLogout={handleLogout} />
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
