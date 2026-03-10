import { useState, useEffect } from 'react';
import styles from '../styles/perfil.module.css';

export default function Perfil() {
  const [stats, setStats] = useState({ totalTests: 0, promedio: 0 });
  const [nombre, setNombre] = useState('Estudiante');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    // Aquí traeremos las stats de la DB
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats`); // Asegúrate de crear este endpoint en tu servidor
        const data = await res.json();
        setStats(data);
      } catch (err) { console.error("Error al cargar stats:", err); }
    };
    fetchStats();
  }, [API_URL]);

  const handleSave = () => {
    alert(`Nombre guardado como: ${nombre}`);
    // Aquí iría un fetch POST a tu API para actualizar el nombre
  };

  return (
    <div className={styles.perfilContainer}>
      <h2 className={styles.title}>Mi Perfil</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p>Tests Realizados</p>
          <strong>{stats.totalTests}</strong>
        </div>
        <div className={styles.statCard}>
          <p>Promedio de Aciertos</p>
          <strong>{stats.promedio}%</strong>
        </div>
      </div>

      <div className={styles.settings}>
        <h3>Ajustes de cuenta</h3>
        <input 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles.input} 
          placeholder="Nombre de usuario" 
        />
        <button className={styles.saveButton} onClick={handleSave}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}