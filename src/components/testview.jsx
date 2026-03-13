import { useState, useEffect } from 'react';
import styles from '../styles/testview.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function TestView({ config, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        setLoading(true);

        // Para modo aleatorio o examen: traer de todos los títulos
        const endpoint = config.tituloId
          ? `${API_URL}/api/preguntas/${config.tituloId}`
          : `${API_URL}/api/preguntas`;

        const response = await fetch(endpoint);
        const data = await response.json();

        const aleatorias = data
          .sort(() => 0.5 - Math.random())
          .slice(0, config.numPreguntas);

        setTest(aleatorias);
      } catch (error) {
        console.error('Error al cargar el test:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, [config.tituloId, config.numPreguntas, API_URL]);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === test[index].correcta) setScore(s => s + 1);
  };

  const handleNext = () => {
    const nextScore = selected === test[index].correcta ? score : score;

    if (index + 1 < test.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      finalizarTest(nextScore);
    }
  };

  const finalizarTest = async (finalScore) => {
    try {
      await fetch(`${API_URL}/api/guardar-resultado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo_id: config.tituloId,
          puntuacion: finalScore,
          total_preguntas: test.length,
          modo: config.modo || 'titulos',
        }),
      });
    } catch (err) {
      console.error('Error guardando resultado:', err);
    }
    onFinish({ score: finalScore, total: test.length });
  };

  if (loading) return (
    <div className={styles.stateScreen}>
      <div className={styles.spinner} />
      <span>Cargando preguntas…</span>
    </div>
  );

  if (test.length === 0) return (
    <div className={styles.stateScreen}>
      <span style={{ fontSize: '2rem' }}>📭</span>
      <span>No hay preguntas disponibles para esta selección.</span>
    </div>
  );

  const p = test[index];
  const progreso = ((index + 1) / test.length) * 100;
  const acertada = selected === p.correcta;

  return (
    <>
      {/* Barra de progreso global */}
      <div className={styles.topBar}>
        <div className={styles.topBarFill} style={{ width: `${progreso}%` }} />
      </div>

      <div className={styles.testContainer}>
        <div className={styles.questionCard}>

          {/* Cabecera */}
          <div className={styles.testHeader}>
            <span className={styles.questionCounter}>
              Pregunta {index + 1} / {test.length}
            </span>
            <span className={styles.scoreChip}>
              ✓ {score} aciertos
            </span>
          </div>

          {/* Enunciado */}
          <p className={styles.questionText}>{p.enunciado}</p>

          {/* Opciones */}
          <div className={styles.optionsContainer}>
            {p.opciones.map((op, i) => {
              let estado = '';
              if (selected !== null) {
                if (i === p.correcta) estado = styles.correct;
                else if (selected === i) estado = styles.incorrect;
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`${styles.optionButton} ${estado}`}
                >
                  <span className={styles.optionLetter}>{LETTERS[i]}</span>
                  {op}
                </button>
              );
            })}
          </div>

          {/* Feedback inmediato */}
          {selected !== null && (
            <div className={`${styles.feedbackBox} ${acertada ? styles.ok : styles.fail}`}>
              {acertada ? '✓ ¡Correcto!' : `✗ La respuesta correcta era: ${p.opciones[p.correcta]}`}
            </div>
          )}

          {/* Botón siguiente */}
          {selected !== null && (
            <button className={styles.nextButton} onClick={handleNext}>
              {index + 1 === test.length ? 'Ver Resultados →' : 'Siguiente →'}
            </button>
          )}

        </div>
      </div>
    </>
  );
}