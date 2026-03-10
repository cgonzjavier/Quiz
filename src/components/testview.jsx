import { useState, useEffect } from 'react';
import { preguntasLey } from '../data/preguntas';
import styles from '../styles/testview.module.css';

export default function TestView({ config, onFinish }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [test, setTest] = useState([]);

  useEffect(() => {
    const prepararTest = () => {
      const list = config.filtroTitulo === 'Todos' 
        ? [...preguntasLey] 
        : preguntasLey.filter(p => p.titulo === config.filtroTitulo);
      
      const aleatorias = list
        .sort(() => 0.5 - Math.random())
        .slice(0, config.numPreguntas);
      
      setTest(aleatorias);
    };
    prepararTest();
  }, [config.filtroTitulo, config.numPreguntas]);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === test[index].correcta) setScore(s => s + 1);
  };

  if (test.length === 0) return <div className={styles.testContainer}>Cargando...</div>;

  const p = test[index];
  const progreso = ((index + 1) / test.length) * 100;

  return (
    <div className={styles.testContainer}>
      <div className={styles.questionCard}>
        {/* Pregunta */}
        <h2 className={styles.questionText}>{p.pregunta}</h2>
        
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

        {/* Botón Siguiente / Resultados */}
        {selected !== null && (
          <button 
            className={styles.nextButton}
            onClick={() => {
              if (index + 1 < test.length) {
                setIndex(index + 1);
                setSelected(null);
              } else {
                onFinish({ score: selected === p.correcta ? score + 1 : score, total: test.length });
              }
            }} 
          >
            {index + 1 === test.length ? "Ver Resultados" : "Siguiente"}
          </button>
        )}

        {/* Barra de progreso */}
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