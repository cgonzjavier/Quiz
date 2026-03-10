import styles from '../styles/backbutton.module.css';

export default function BackButton({ onClick }) {
  return (
    <button className={styles.backButton} onClick={onClick}>
      ← Volver
    </button>
  );
}