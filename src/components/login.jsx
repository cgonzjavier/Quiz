import { useState } from 'react';
import { usuariosAutorizados } from '../data/usuarios';
import styles from '../styles/login.module.css';
import logo from '../img/logo.png'; 

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificamos si existe un usuario que coincida
    const esValido = usuariosAutorizados.find(
      (u) => u.usuario === user && u.clave === pass
    );

    if (esValido) {
      setError(false);
      onLogin(); // Llama a la función que cambia el estado padre (ej. App.jsx)
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        
        <img src={logo} alt="IUS Logo" className={styles.logo} />
        <p className={styles.slogan}>La precisión que la ley exige</p>
        
        <input 
          type="text" 
          placeholder="Usuario" 
          className={styles.inputField} 
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className={styles.inputField} 
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        
        {error && (
          <p style={{ color: '#EF4444', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Usuario o contraseña incorrectos
          </p>
        )}
        
        <button type="submit" className={styles.submitButton}>Entrar</button>
      </form>
    </div>
  );
}