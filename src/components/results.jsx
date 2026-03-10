import styles from '../styles/results.module.css';

export default function Results({ score, onRestart }) {
  const porcentaje = Math.round((score.score / score.total) * 100);
  
  // Mensajes dinámicos
  const getMensaje = (p) => {
    if (p >= 90) return "¡Excelente! Estás listo para el examen.";
    if (p >= 70) return "¡Muy bien! Vas por el buen camino.";
    if (p >= 50) return "Aprobado, pero hay que repasar un poco.";
    return "Ánimo, ¡a seguir estudiando!";
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCard}>
        <h2 className={styles.scoreTitle}>Test Finalizado</h2>
        
        <div className={styles.scoreCircle}>
          <div className={styles.scorePercentage}>{porcentaje}%</div>
        </div>
        
        <p className={styles.mensaje}>{getMensaje(porcentaje)}</p>
        
        <p className={styles.statsText}>
          Has acertado <strong>{score.score}</strong> de <strong>{score.total}</strong> preguntas.
        </p>

        <div className={styles.buttonGroup}>
          <button onClick={onRestart} className={styles.restartButton}>
            Volver al menú
          </button>
        </div>
      </div>
    </div>
  );
}