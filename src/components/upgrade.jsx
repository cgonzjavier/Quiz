import styles from '../styles/upgrade.module.css';

const beneficios = [
  { icon: '🎲', titulo: 'Modo Aleatorio', desc: 'Preguntas mixtas de todos los títulos para entrenar sin límites.' },
  { icon: '⏱️', titulo: 'Simulacro de Examen', desc: 'Condiciones reales: tiempo, puntuación y revisión detallada.' },
  { icon: '📊', titulo: 'Estadísticas avanzadas', desc: 'Historial completo, tasa de acierto por tema y evolución.' },
];

export default function Upgrade({ onBack }) {
  const handleUpgrade = () => {
    alert('Próximamente: integración con Stripe para activar Premium.');
  };

  return (
    <div className={styles.upgradeContainer}>
      <div className={styles.inner}>

        <div className={styles.badge}>⭐ Plan Premium</div>

        <h1 className={styles.title}>Desbloquea todo tu potencial</h1>
        <p className={styles.subtitle}>
          Accede a todas las funcionalidades y prepara el examen sin restricciones.
        </p>

        <div className={styles.beneficiosList}>
          {beneficios.map((b) => (
            <div key={b.titulo} className={styles.beneficioItem}>
              <div className={styles.beneficioIcon}>{b.icon}</div>
              <div className={styles.beneficioText}>
                <strong>{b.titulo}</strong>
                <span>{b.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pricing}>
          <span className={styles.price}>9,99 €</span>
          <span className={styles.period}>/ mes</span>
        </div>

        <button className={styles.ctaButton} onClick={handleUpgrade}>
          Actualizar a Premium
        </button>

        <button className={styles.backLink} onClick={onBack}>
          Volver al inicio
        </button>

      </div>
    </div>
  );
}
