import { useState, useEffect } from 'react';
import styles from '../styles/menuconfig.module.css';

export default function MenuConfig({ onStart }) {
  const [titulos, setTitulos] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [num, setNum] = useState(10);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const cargarTitulos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/titulos`);
        const data = await respuesta.json();
        setTitulos(data);
        if (data.length > 0) setSelectedId(data[0].id);
      } catch (err) { console.error("Error:", err); }
    };
    cargarTitulos();
  }, [API_URL]);

  return (
    <div className={styles.configContainer}>
      <div className={styles.configCard}>
        <h2 className={styles.title}>Configuración del Test</h2>
        
        <p className={styles.label}>Selecciona el título a evaluar:</p>
        <div className={styles.grid}>
          {titulos.map(t => (
            <div 
              key={t.id} 
              className={`${styles.card} ${selectedId === t.id ? styles.active : ''}`}
              onClick={() => setSelectedId(t.id)}
            >
              <span className={styles.cardText}>{t.nombre}</span>
            </div>
          ))}
        </div>

        <div className={styles.sliderContainer}>
          <label className={styles.label}>Preguntas: <strong>{num}</strong></label>
          <input 
            type="range" min="5" max="50" step="5" value={num} 
            className={styles.range}
            onChange={(e) => setNum(Number(e.target.value))} 
          />
        </div>

        <button 
          className={styles.startButton} 
          onClick={() => onStart({ tituloId: selectedId, numPreguntas: num })}
        >
          Iniciar Test
        </button>
      </div>
    </div>
  );
}