import { useState, useEffect } from 'react';
import styles from '../styles/menuconfig.module.css';

export default function MenuConfig({ onStart, mode = 'titulos' }) {
  const [titulos, setTitulos] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [num, setNum] = useState(10);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

  // Solo cargamos títulos en modo "titulos"
  useEffect(() => {
    if (mode !== 'titulos') return;
    const cargarTitulos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/titulos`);
        const data = await res.json();
        setTitulos(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) {
        console.error('Error cargando títulos:', err);
      }
    };
    cargarTitulos();
  }, [mode, API_URL]);

  const modeConfig = {
    examen: {
      title: 'Simulacro de Examen',
      subtitle: 'Condiciones reales de oposición',
      banner: {
        icon: '⏱️',
        heading: 'Modo examen activado',
        desc: 'Se mezclarán preguntas de todos los títulos con tiempo límite.',
      },
    },
    aleatorio: {
      title: 'Preguntas Aleatorias',
      subtitle: 'Repaso libre sin orden fijo',
      banner: {
        icon: '🎲',
        heading: 'Modo aleatorio activado',
        desc: 'Las preguntas se seleccionan al azar de toda la base de datos.',
      },
    },
    titulos: {
      title: 'Test por Títulos',
      subtitle: 'Elige el tema que quieres repasar',
    },
  };

  const cfg = modeConfig[mode] || modeConfig.titulos;

  const handleStart = () => {
    if (mode === 'titulos' && !selectedId) return;
    onStart({
      tituloId: mode === 'titulos' ? selectedId : null,
      numPreguntas: num,
      modo: mode,
    });
  };

  return (
    <div className={styles.configContainer}>
      <div className={styles.configCard}>

        <div className={styles.titleArea}>
          <h2>{cfg.title}</h2>
          <p>{cfg.subtitle}</p>
        </div>

        {/* Banner informativo para examen/aleatorio */}
        {cfg.banner && (
          <div className={styles.examBanner}>
            <span className={styles.examIcon}>{cfg.banner.icon}</span>
            <div>
              <h3>{cfg.banner.heading}</h3>
              <p>{cfg.banner.desc}</p>
            </div>
          </div>
        )}

        {/* Selector de tema — solo en modo titulos */}
        {mode === 'titulos' && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Tema</span>
            <div className={styles.temaGrid}>
              {titulos.map(t => (
                <div
                  key={t.id}
                  className={`${styles.temaCard} ${selectedId === t.id ? styles.active : ''}`}
                  onClick={() => setSelectedId(t.id)}
                >
                  <span className={styles.dot} />
                  {t.nombre}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Número de preguntas */}
        <div className={styles.section}>
          <div className={styles.sliderRow}>
            <span className={styles.sectionLabel}>Número de preguntas</span>
            <span className={styles.sliderValue}>{num}</span>
          </div>
          <input
            type="range" min="5" max="50" step="5" value={num}
            className={styles.range}
            onChange={(e) => setNum(Number(e.target.value))}
          />
        </div>

        <button className={styles.startButton} onClick={handleStart}>
          {mode === 'examen' ? '⏱ Iniciar Examen' : mode === 'aleatorio' ? '🎲 Empezar' : '▶ Iniciar Test'}
        </button>

      </div>
    </div>
  );
}