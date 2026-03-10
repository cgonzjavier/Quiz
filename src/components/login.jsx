import { useState } from 'react';
import styles from '../styles/login.module.css';
import logo from '../img/logo.png'; 

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  // Esta variable detecta automáticamente si estás en la nube (Render) o en local
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Usamos ${API_URL} para que siempre busque el servidor en el sitio correcto
      const respuesta = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: user, clave: pass })
      });

      const data = await respuesta.json();

      if (data.success) {
        setError(false);
        onLogin(); // Entras a la app
      } else {
        setError(true);
      }
    } catch (err) {
        console.error("Error conectando con el servidor:", err);
        alert("El servidor no responde");
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