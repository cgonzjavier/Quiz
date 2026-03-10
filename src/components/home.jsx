import styles from '../styles/home.module.css';

export default function Home({ onSelectMode }) {
  const modos = [
    { id: 'titulos', label: 'Por Temas', icon: '📚' },
    { id: 'aleatorio', label: 'Aleatorio', icon: '🎲' },
    { id: 'examen', label: 'Examen (Cronómetro)', icon: '⏱️' },
    { id: 'perfil', label: 'Mi Perfil', icon: '👤' }
  ];

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Panel de Estudio</h1>
        <p>¿Qué vamos a repasar hoy?</p>
      </header>

      <div className={styles.grid}>
        {modos.map((m) => (
          <div key={m.id} className={styles.card} onClick={() => onSelectMode(m.id)}>
            <div className={styles.icon}>{m.icon}</div>
            <h3>{m.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}