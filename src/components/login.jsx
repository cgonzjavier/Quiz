import styles from '../styles/login.module.css';
import logo from '../img/logo.png'; 

export default function Login({ onLogin }) {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        
        <img src={logo} alt="IUS Logo" className={styles.logo} />
        <p className={styles.slogan}>La precisión que la ley exige</p>
        
        <input type="text" placeholder="Usuario" className={styles.inputField} />
        <input type="password" placeholder="Contraseña" className={styles.inputField} />
        
        <button type="submit" className={styles.submitButton}>Entrar</button>
      </form>
    </div>
  );
}