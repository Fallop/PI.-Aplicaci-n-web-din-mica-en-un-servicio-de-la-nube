const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS peliculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descripcion TEXT,
    imagen TEXT,
    trailer TEXT
  )`);
});

module.exports = db;

// Agregar películas
db.get("SELECT COUNT(*) AS count FROM peliculas", (err, row) => {
  if (row.count === 0) {
    const peliculasEjemplo = [
      {
        titulo: "Interstellar",
        descripcion: "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.",
        imagen: "https://m.media-amazon.com/images/S/pv-target-images/79194981293eabf6620ece96eb5a9c1fffa04d3374ae12986e0748800b37b9cf.jpg",
        trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
      },
      {
        titulo: "Inception",
        descripcion: "Un ladrón que roba secretos del subconsciente debe realizar una misión imposible: implantar una idea.",
        imagen: "https://m.media-amazon.com/images/I/51NbVEuw1HL._AC_.jpg",
        trailer: "https://www.youtube.com/watch?v=8hP9D6kZseM"
      },
      {
        titulo: "The Matrix",
        descripcion: "Un hacker descubre la verdad sobre la realidad que lo rodea y su rol en la rebelión contra las máquinas.",
        imagen: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
        trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8"
      },
      {
        titulo: "El Padrino",
        descripcion: "La historia del ascenso de la familia criminal Corleone en Estados Unidos.",
        imagen: "https://m.media-amazon.com/images/M/MV5BZmNiNzM4MTctODI5YS00MzczLWE2MzktNzY4YmNjYjA5YmY1XkEyXkFqcGc@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=UaVTIH8mujA"
      },
      {
        titulo: "Avengers: Endgame",
        descripcion: "Los Vengadores se unen para deshacer el daño causado por Thanos.",
        imagen: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      },
      {
        titulo: "Coco",
        descripcion: "Un niño mexicano viaja al mundo de los muertos para descubrir su herencia musical.",
        imagen: "https://lumiere-a.akamaihd.net/v1/images/p_coco_19736_fd5fa537.jpeg?region=0,0,540,810",
        trailer: "https://www.youtube.com/watch?v=Ga6RYejo6Hk"
      },
      {
        titulo: "Toy Story",
        descripcion: "Los juguetes de Andy cobran vida cuando nadie los ve.",
        imagen: "https://m.media-amazon.com/images/M/MV5BZTA3OWVjOWItNjE1NS00NzZiLWE1MjgtZDZhMWI1ZTlkNzYwXkEyXkFqcGc@._V1_.jpg",
        trailer: "https://www.youtube.com/watch?v=v-PjgYDrg70"
      },
      {
        titulo: "Titanic",
        descripcion: "Una historia de amor trágica a bordo del Titanic.",
        imagen: "https://static.wikia.nocookie.net/cine/images/2/22/Titanic_poster.jpg/revision/latest?cb=20121020140546",
        trailer: "https://www.youtube.com/watch?v=kVrqfYjkTdQ"
      },
      {
        titulo: "El Señor de los Anillos: La Comunidad del Anillo",
        descripcion: "Un hobbit emprende una misión para destruir un anillo maldito.",
        imagen: "https://pics.filmaffinity.com/El_seanor_de_los_anillos_La_comunidad_del_anillo-952398002-large.jpg",
        trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4"
      },
      {
        titulo: "Spider-Man: No Way Home",
        descripcion: "El multiverso se desata cuando Peter Parker pide ayuda al Doctor Strange.",
        imagen: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/df/Spider-Man_No_Way_Home_Poster.png/revision/latest?cb=20211201150655&path-prefix=es",
        trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
      }
    ];

    const stmt = db.prepare("INSERT INTO peliculas (titulo, descripcion, imagen, trailer) VALUES (?, ?, ?, ?)");
    peliculasEjemplo.forEach(p => {
      stmt.run(p.titulo, p.descripcion, p.imagen, p.trailer);
    });
    stmt.finalize();
    console.log("Películas de ejemplo insertadas.");
  }
});
