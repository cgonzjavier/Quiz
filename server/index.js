import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para ver qué recibe el servidor en la consola
app.use((req, _, next) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Datos recibidos:', req.body);
  }
  next();
});

// Ruta para el login
app.post('/api/login', (req, res) => {
  const { usuario, clave } = req.body;

  // Simulamos una base de datos
  const usuariosDB = [
    { usuario: "guille", clave: "guille" }
  ];

  const esValido = usuariosDB.find(u => u.usuario === usuario && u.clave === clave);

  if (esValido) {
    res.json({ success: true, message: "Acceso concedido" });
  } else {
    res.status(401).json({ success: false, message: "Credenciales incorrectas" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});