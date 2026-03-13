import styles from '../styles/home.module.css';
import { useUserPlan } from '../hooks/useUserPlan';

const PREMIUM_MODES = new Set(['aleatorio', 'examen']);

export default function Home({ onSelectMode }) {
  const { isPremium, loading } = useUserPlan();

  const modos = [
    { id: 'titulos',   label: 'Por Títulos', desc: 'Estudia tema a tema',      icon: '📚' },
    { id: 'aleatorio', label: 'Aleatorio',   desc: 'Preguntas mixtas',         icon: '🎲' },
    { id: 'examen',    label: 'Simulacro',   desc: 'Condiciones reales',       icon: '⏱️' },
  ];

  const handleCard = (id) => {
    if (!isPremium && PREMIUM_MODES.has(id)) {
      onSelectMode('upgrade');
    } else {
      onSelectMode(id);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>⚖️ Código Penal</div>
        <h1>Panel de Estudio</h1>
        <p>¿Qué vamos a repasar hoy?</p>
      </header>

      <div className={styles.grid}>
        {modos.map((m) => {
          const locked = !loading && !isPremium && PREMIUM_MODES.has(m.id);
          return (
            <div
              key={m.id}
              className={`${styles.card} ${locked ? styles.cardLocked : ''}`}
              onClick={() => handleCard(m.id)}
            >
              <div className={styles.iconWrap}>{m.icon}</div>
              <h3>{m.label}</h3>
              <p>{m.desc}</p>

              {locked && (
                <div className={styles.lockOverlay}>
                  <span className={styles.lockIcon}>🔒</span>
                  <span className={styles.lockLabel}>Disponible en Premium</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Tarjeta perfil */}
        <div
          className={`${styles.card} ${styles.cardPerfil}`}
          onClick={() => onSelectMode('perfil')}
        >
          <div className={styles.iconWrap}>👤</div>
          <div style={{ textAlign: 'left' }}>
            <h3>Mi Perfil</h3>
            <p>Estadísticas y progreso</p>
          </div>
        </div>
      </div>
    </div>
  );
}
