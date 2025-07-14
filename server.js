const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Obtener todas las películas
app.get('/peliculas', (req, res) => {
  db.all("SELECT * FROM peliculas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Agregar una película
app.post('/peliculas', (req, res) => {
  const { titulo, descripcion, imagen, trailer } = req.body;
  db.run("INSERT INTO peliculas (titulo, descripcion, imagen, trailer) VALUES (?, ?, ?, ?)",
    [titulo, descripcion, imagen, trailer],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Eliminar una película
app.delete('/peliculas/:id', (req, res) => {
  db.run("DELETE FROM peliculas WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Película eliminada" });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
