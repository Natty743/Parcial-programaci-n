
// Simple Express server to serve frontend and expose a JSON API
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Example API endpoint
app.get('/api/message', (req, res) => {
  res.json({
    success: true,
    message: 'Hola desde el backend. API funcionando correctamente.',
    timestamp: new Date().toISOString()
  });
});

// A sample POST endpoint to show receiving JSON
app.post('/api/echo', (req, res) => {
  res.json({
    received: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
