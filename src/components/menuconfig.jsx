import { useState, useMemo } from 'react';
import { preguntasLey } from '../data/preguntas';
import styles from '../styles/menuconfig.module.css';

export default function MenuConfig({ onStart }) {
  const [filtro, setFiltro] = useState('Todos');
  const [num, setNum] = useState(10);

  const titulos = useMemo(() => ['Todos', ...new Set(preguntasLey.map(p => p.titulo))], []);
  
  return (
    <div className={styles.configContainer}>
      <div className={styles.configCard}>
        <h2 style={{ textAlign: 'center', color: '#C5A059' }}>Configuración</h2>
        
        <label className={styles.label}>Ley a evaluar:</label>
        <select className={styles.select} onChange={(e) => setFiltro(e.target.value)}>
          {titulos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <label className={styles.label}>Número de preguntas: {num}</label>
        <input 
          type="range" min="5" max="50" value={num} 
          className={styles.range}
          onChange={(e) => setNum(Number(e.target.value))} 
        />

        <button 
        className={styles.startButton} 
        onClick={() => onStart({ 
            filtroTitulo: filtro,
            numPreguntas: num    
        })}
        >
        Comenzar Test
        </button>
      </div>
    </div>
  );
}