const API_URL = "http://localhost:4000/api/citas";

// ==== Formatear fecha a: “miércoles 19 de noviembre de 2025” ====
function formatearFecha(fechaISO) {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                 "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  const fecha = new Date(fechaISO);

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  return `${diaSemana} ${dia} de ${mes} de ${año}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // ==== Verificar sesión ====
  const barberoData = localStorage.getItem("barbero_actual");
  if (!barberoData) {
    alert("Debes iniciar sesión.");
    window.location.href = "login.html";
    return;
  }

  const barbero = JSON.parse(barberoData);

  const titulo = document.getElementById("tituloBarbero");
  const citasList = document.getElementById("citasList");
  const logoutBtn = document.getElementById("logoutBtn");
  const exportarBtn = document.getElementById("exportarBtn");

  titulo.textContent = `Agenda de ${barbero.nombre}`;

  // ==== Logout ====
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("barbero_actual");
    window.location.href = "login.html";
  });

  // ==== Cargar citas desde la API ====
  async function cargarCitas() {
    try {
      const res = await fetch(API_URL);
      const todas = await res.json();

      // Filtrar por usuario del barbero
      const mias = todas.filter(c => c.barbero === barbero.usuario);

      renderCitasPorDia(mias);
    } catch (err) {
      console.error("Error cargando citas:", err);
    }
  }

  // ==== Renderizar citas agrupadas por día ====
  function renderCitasPorDia(citas) {
    citasList.innerHTML = "";

    if (citas.length === 0) {
      citasList.innerHTML = "<p>No hay citas asignadas.</p>";
      return;
    }

    const porDia = {};

    citas.forEach(c => {
      if (!porDia[c.fecha]) porDia[c.fecha] = [];
      porDia[c.fecha].push(c);
    });

    Object.keys(porDia).sort().forEach(dia => {
      // Crear título del día formateado
      const h3 = document.createElement("h3");
      h3.className = "titulo-dia";
      h3.textContent = formatearFecha(dia);
      citasList.appendChild(h3);

      // Renderizar citas del día
      porDia[dia].forEach(c => {
        const div = document.createElement("div");
        div.className = "cita-item";

        div.innerHTML = `
          <div>
            <p><strong>${c.nombre}</strong> — ${c.servicio}</p>
            <p>${formatearFecha(c.fecha)} a las ${c.hora}</p>
            <p>${c.email}</p>
          </div>
          <button class="btn-eliminar" data-id="${c.id}">Eliminar</button>
        `;

        citasList.appendChild(div);
      });
    });

    activarBotonesEliminar();
  }

  // ==== Eliminar cita ====
  function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".btn-eliminar");

    botones.forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");

        if (!confirm("¿Eliminar esta cita?")) return;

        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarCitas();
      });
    });
  }

  // ==== Exportar CSV ====
  exportarBtn.addEventListener("click", async () => {
    const res = await fetch(API_URL);
    const todas = await res.json();
    const mias = todas.filter(c => c.barbero === barbero.usuario);

    if (mias.length === 0) {
      alert("No hay citas para exportar.");
      return;
    }

    const filas = [
      ["ID", "Cliente", "Email", "Barbero", "Servicio", "Fecha", "Hora"],
      ...mias.map(c => [
        c.id,
        c.nombre,
        c.email,
        c.barbero,
        c.servicio,
        formatearFecha(c.fecha),
        c.hora
      ])
    ];

    const csv = filas.map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `agenda_${barbero.usuario}.csv`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ==== Inicializar ====
  cargarCitas();
});
