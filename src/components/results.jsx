import { useEffect, useState } from 'react';
import styles from '../styles/results.module.css';

export default function Results({ score, onRestart, onRepeat }) {
  const porcentaje = score.total > 0 ? Math.round((score.score / score.total) * 100) : 0;
  const errores = score.total - score.score;

  // Animación del anillo SVG
  const RADIUS = 54;
  const CIRCUM = 2 * Math.PI * RADIUS;
  const [offset, setOffset] = useState(CIRCUM);

  useEffect(() => {
    const t = setTimeout(() => {
      setOffset(CIRCUM - (porcentaje / 100) * CIRCUM);
    }, 100);
    return () => clearTimeout(t);
  }, [porcentaje, CIRCUM]);

  const getMensaje = (p) => {
    if (p >= 90) return '¡Sobresaliente! Estás listo.';
    if (p >= 70) return '¡Buen resultado! Sigue así.';
    if (p >= 50) return 'Aprobado. Refuerza los fallos.';
    return 'A seguir estudiando. ¡Ánimo!';
  };

  const getColor = (p) => {
    if (p >= 70) return '#10B981';
    if (p >= 50) return 'var(--gold)';
    return '#EF4444';
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCard}>

        <h2 className={styles.resultsTitle}>Test Finalizado</h2>

        {/* Anillo animado */}
        <div className={styles.scoreRing}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle className={styles.scoreTrack} cx="70" cy="70" r={RADIUS} />
            <circle
              className={styles.scoreFill}
              cx="70" cy="70" r={RADIUS}
              strokeDasharray={CIRCUM}
              strokeDashoffset={offset}
              stroke={getColor(porcentaje)}
            />
          </svg>
          <div className={styles.scoreText}>
            <span className={styles.scorePercent}>{porcentaje}%</span>
            <span className={styles.scoreSub}>aciertos</span>
          </div>
        </div>

        <p className={styles.mensaje}>{getMensaje(porcentaje)}</p>
        <p className={styles.statsText}>
          {score.score} correctas de {score.total} preguntas
        </p>

        {/* Detalle */}
        <div className={styles.detailGrid}>
          <div className={`${styles.detailCard} ${styles.green}`}>
            <strong>{score.score}</strong>
            <span>Correctas</span>
          </div>
          <div className={`${styles.detailCard} ${styles.red}`}>
            <strong>{errores}</strong>
            <span>Errores</span>
          </div>
        </div>

        {/* Acciones */}
        <div className={styles.buttonGroup}>
          <button onClick={onRestart} className={styles.restartButton}>
            Volver al menú
          </button>
          {onRepeat && (
            <button onClick={onRepeat} className={styles.repeatButton}>
              ↺ Repetir test
            </button>
          )}
        </div>

      </div>
    </div>
  );
}