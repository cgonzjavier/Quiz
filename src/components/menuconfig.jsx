import { useState, useEffect } from 'react';
import styles from '../styles/menuconfig.module.css';

export default function MenuConfig({ onStart }) {
  const [titulos, setTitulos] = useState([]);
  const [selectedId, setSelectedId] = useState(''); // Guardamos el ID
  const [num, setNum] = useState(10);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    // Definimos la función async dentro del useEffect
    const cargarTitulos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/titulos`);
        const data = await respuesta.json();
        
        setTitulos(data);
        if (data.length > 0) {
          setSelectedId(data[0].id); // Seleccionamos el primero por defecto
        }
      } catch (err) {
        console.error("Error al cargar los títulos:", err);
      }
    };

    cargarTitulos();
  }, [API_URL]); // Añadimos API_URL como dependencia por seguridad

  return (
    <div className={styles.configContainer}>
      <div className={styles.configCard}>
        <h2 style={{ textAlign: 'center', color: '#C5A059' }}>Configuración</h2>
        
        <label className={styles.label}>Ley a evaluar:</label>
        <select className={styles.select} onChange={(e) => setSelectedId(e.target.value)}>
          {titulos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
        </select>

        <label className={styles.label}>Número de preguntas: {num}</label>
        <input 
          type="range" min="5" max="50" value={num} 
          className={styles.range}
          onChange={(e) => setNum(Number(e.target.value))} 
        />

        <button 
          className={styles.startButton} 
          onClick={() => onStart({ tituloId: selectedId, numPreguntas: num })}
        >
          Comenzar Test
        </button>
      </div>
    </div>
  );
}