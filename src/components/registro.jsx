import { useState } from 'react';
import styles from '../styles/login.module.css';
import logo from '../img/logo.png';
import { supabase } from '../lib/supabaseClient';

export default function Registro({ onRegistrado, onShowLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (pass !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (pass.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <img src={logo} alt="IUS Logo" className={styles.logo} />
          <p className={styles.slogan}>La precisión que la ley exige</p>
          <p style={{ color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.6 }}>
            Cuenta creada. Revisa tu email para confirmar el registro y luego inicia sesión.
          </p>
          <button className={styles.submitButton} onClick={onShowLogin}>
            Ir al login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>

        <img src={logo} alt="IUS Logo" className={styles.logo} />
        <p className={styles.slogan}>La precisión que la ley exige</p>

        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={styles.inputField}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          className={styles.inputField}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p className={styles.errorMsg}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onShowLogin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              cursor: 'pointer',
              fontSize: 'inherit',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            Inicia sesión
          </button>
        </p>

      </form>
    </div>
  );
}
