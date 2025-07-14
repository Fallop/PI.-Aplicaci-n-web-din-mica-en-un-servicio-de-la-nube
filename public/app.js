const API = "/peliculas";

async function cargarPeliculas() {
  const res = await fetch(API);
  const peliculas = await res.json();
  const contenedor = document.getElementById("lista-peliculas");
  contenedor.innerHTML = "";
  peliculas.forEach(p => {
    const div = document.createElement("div");
    div.className = "pelicula";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.titulo}">
      <h2>${p.titulo}</h2>
      <p>${p.descripcion}</p>
      <a href="${p.trailer}" target="_blank">🎥 Ver trailer</a><br/>
      <button onclick="eliminarPelicula(${p.id})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

document.getElementById("form-pelicula").addEventListener("submit", async e => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const trailer = document.getElementById("trailer").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion, imagen, trailer })
  });

  e.target.reset();
  cargarPeliculas();
});

async function eliminarPelicula(id) {
  const confirmar = confirm("¿Estás seguro que deseas eliminar esta película?");
  if (!confirmar) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  cargarPeliculas();
}


cargarPeliculas();
