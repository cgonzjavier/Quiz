import styles from '../styles/home.module.css';

export default function Home({ onSelectMode }) {
  const modos = [
    {
      id: 'titulos',
      label: 'Por Títulos',
      desc: 'Estudia tema a tema',
      icon: '📚'
    },
    {
      id: 'aleatorio',
      label: 'Aleatorio',
      desc: 'Preguntas mixtas',
      icon: '🎲'
    },
    {
      id: 'examen',
      label: 'Simulacro',
      desc: 'Condiciones reales',
      icon: '⏱️'
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>⚖️ Código Penal</div>
        <h1>Panel de Estudio</h1>
        <p>¿Qué vamos a repasar hoy?</p>
      </header>

      <div className={styles.grid}>
        {modos.map((m) => (
          <div key={m.id} className={styles.card} onClick={() => onSelectMode(m.id)}>
            <div className={styles.iconWrap}>{m.icon}</div>
            <h3>{m.label}</h3>
            <p>{m.desc}</p>
          </div>
        ))}

        {/* Tarjeta perfil que ocupa todo el ancho */}
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