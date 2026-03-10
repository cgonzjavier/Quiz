import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors({
  origin: 'https://iustest.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Log de peticiones para depuración
app.use((req, _, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Datos recibidos:', req.body);
  }
  next();
});

// Ruta para obtener los titulos disponibles
app.get('/api/titulos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM titulos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener los titulos:", err);
    res.status(500).json({ error: "Error al obtener títulos" });
  }
});

// Ruta para obtener preguntas por ID de título
app.get('/api/preguntas/:tituloId', async (req, res) => {
  const { tituloId } = req.params;

  try {
    const query = 'SELECT * FROM preguntas WHERE titulo_id = $1';
    const result = await pool.query(query, [tituloId]);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: "No hay preguntas para este título" });
    }
  } catch (err) {
    console.error("Error al obtener preguntas:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta de Login real contra PostgreSQL
app.post('/api/login', async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    // Consulta SQL parametrizada para evitar inyecciones SQL
    const query = 'SELECT * FROM usuarios WHERE usuario = $1 AND clave = $2';
    const result = await pool.query(query, [usuario, clave]);

    if (result.rows.length > 0) {
      // Si el usuario existe
      res.json({ success: true, message: "Acceso concedido" });
    } else {
      // Si no existe o las credenciales no coinciden
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});