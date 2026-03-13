import { useState, useEffect } from 'react';
import styles from '../styles/perfil.module.css';

export default function Perfil({ onLogout }) {
  const [stats, setStats] = useState({ totalTests: 0, promedio: 0, mejorMarca: 0 });
  const [historial, setHistorial] = useState([]);
  const [nombre, setNombre] = useState('Estudiante');
  const [saved, setSaved] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resStats, resHistorial] = await Promise.all([
          fetch(`${API_URL}/api/stats`),
          fetch(`${API_URL}/api/historial`),
        ]);
        const dataStats    = await resStats.json();
        const dataHistorial = await resHistorial.json();
        setStats(dataStats);
        setHistorial(Array.isArray(dataHistorial) ? dataHistorial.slice(0, 5) : []);
      } catch (err) {
        console.error('Error al cargar perfil:', err);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleSave = async () => {
    try {
      await fetch(`${API_URL}/api/usuario`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Error al guardar');
    }
  };

  const getScoreClass = (p) => {
    if (p >= 70) return styles.good;
    if (p >= 50) return styles.mid;
    return styles.bad;
  };

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.inner}>

        {/* Cabecera */}
        <div className={styles.perfilHeader}>
          <div className={styles.avatar}>👤</div>
          <div>
            <h2>{nombre}</h2>
            <p>Estudiante · Código Penal</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Estadísticas</p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <strong>{stats.totalTests}</strong>
              <span>Tests</span>
            </div>
            <div className={styles.statCard}>
              <strong>{stats.promedio}%</strong>
              <span>Promedio</span>
            </div>
            <div className={styles.statCard}>
              <strong>{stats.mejorMarca ?? 0}%</strong>
              <span>Mejor</span>
            </div>
          </div>

          {/* Barra de progreso global */}
          <div className={styles.progressRow}>
            <div className={styles.progressLabel}>
              <span>Tasa de acierto global</span>
              <span>{stats.promedio}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${stats.promedio ?? 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Últimos tests</p>
          {historial.length === 0 ? (
            <p className={styles.emptyHistory}>
              Aún no has realizado ningún test. ¡Empieza ahora!
            </p>
          ) : (
            <div className={styles.historyList}>
              {historial.map((h, i) => {
                const pct = Math.round((h.puntuacion / h.total_preguntas) * 100);
                return (
                  <div key={i} className={styles.historyItem}>
                    <div className={styles.historyLeft}>
                      <strong>{h.titulo || 'Test aleatorio'}</strong>
                      <span>{h.fecha ? new Date(h.fecha).toLocaleDateString('es-ES') : '—'}</span>
                    </div>
                    <span className={`${styles.historyScore} ${getScoreClass(pct)}`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ajustes */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Ajustes de cuenta</p>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.inputField}
            placeholder="Nombre de usuario"
          />
          <button className={styles.saveButton} onClick={handleSave}>
            {saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
          <button className={styles.logoutButton} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>

      </div>
    </div>
  );
}