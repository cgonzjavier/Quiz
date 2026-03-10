import { useState, useEffect } from 'react';
import styles from '../styles/testview.module.css';

export default function TestView({ config, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchPreguntas = async () => {
      // Si no hay ID, no intentamos hacer la petición
      if (!config.tituloId) return;

      try {
        setLoading(true);
        // Usamos ${API_URL} para que funcione en cualquier sitio
        const response = await fetch(`${API_URL}/api/preguntas/${config.tituloId}`);
        const data = await response.json();
        
        // Mezclar aleatoriamente las preguntas recibidas de la BD
        const aleatorias = data
          .sort(() => 0.5 - Math.random())
          .slice(0, config.numPreguntas);
        
        setTest(aleatorias);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el test:", error);
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, [config.tituloId, config.numPreguntas, API_URL]);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    // test[index].correcta ya es un entero (0, 1, 2...)
    if (i === test[index].correcta) setScore(s => s + 1);
  };

  if (loading) return <div className={styles.testContainer}>Cargando preguntas...</div>;
  if (test.length === 0) return <div className={styles.testContainer}>No hay preguntas disponibles.</div>;

  const p = test[index];
  const progreso = ((index + 1) / test.length) * 100;

  return (
    <div className={styles.testContainer}>
      <div className={styles.questionCard}>
        {/* Cambiado de p.pregunta a p.enunciado según BD */}
        <h2 className={styles.questionText}>{p.enunciado}</h2>
        
        <div className={styles.optionsContainer}>
          {p.opciones.map((op, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(i)}
              className={`${styles.optionButton} ${
                selected !== null 
                  ? (i === p.correcta ? styles.correct : (selected === i ? styles.incorrect : ""))
                  : ""
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {selected !== null && (
          <button 
            className={styles.nextButton}
            onClick={() => {
              if (index + 1 < test.length) {
                setIndex(index + 1);
                setSelected(null);
              } else {
                onFinish({ score: selected === p.correcta ? score : score, total: test.length });
              }
            }} 
          >
            {index + 1 === test.length ? "Ver Resultados" : "Siguiente"}
          </button>
        )}

        <div className={styles.progressContainer}>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            Pregunta {index + 1} de {test.length}
          </p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}