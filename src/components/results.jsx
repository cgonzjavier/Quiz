import styles from '../styles/results.module.css';

export default function Results({ score, onRestart }) {
  const porcentaje = Math.round((score.score / score.total) * 100);

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCard}>
        <h2 className={styles.scoreTitle}>Resultado del Test</h2>
        
        <div className={styles.scorePercentage}>
          {porcentaje}%
        </div>
        
        <p className={styles.statsText}>
          Has acertado {score.score} de {score.total} preguntas.
        </p>

        <button onClick={onRestart} className={styles.restartButton}>
          Volver al menú
        </button>
      </div>
    </div>
  );
}