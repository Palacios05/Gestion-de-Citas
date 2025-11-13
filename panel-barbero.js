document.addEventListener("DOMContentLoaded", () => {
  const citasList = document.getElementById("citasList");
  const exportarBtn = document.getElementById("exportarBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const titulo = document.getElementById("tituloBarbero");

  let citas = JSON.parse(localStorage.getItem("citas")) || [];
  const barberoActivo = localStorage.getItem("barberoActivo");

  if (!barberoActivo) {
    alert("Inicia sesión primero.");
    window.location.href = "login.html";
    return;
  }

  titulo.textContent = `Citas de ${barberoActivo}`;

  function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + "T00:00:00");

    const opciones = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    };

    return fecha.toLocaleDateString("es-ES", opciones)
      .replace(/^\w/, c => c.toUpperCase());
  }

  function renderCitas() {
    const filtradas = citas
      .filter(c => c.barbero === barberoActivo)
      .sort((a, b) => new Date(a.fecha + "T" + a.hora) - new Date(b.fecha + "T" + b.hora));

    if (filtradas.length === 0) {
      citasList.innerHTML = `<p>No hay citas para ${barberoActivo}.</p>`;
      return;
    }

    const citasPorDia = {};

    filtradas.forEach(c => {
      if (!citasPorDia[c.fecha]) citasPorDia[c.fecha] = [];
      citasPorDia[c.fecha].push(c);
    });

    citasList.innerHTML = "";

    Object.keys(citasPorDia).forEach(fecha => {
      const tituloDia = document.createElement("h3");
      tituloDia.classList.add("titulo-dia");
      tituloDia.textContent = formatearFecha(fecha);

      citasList.appendChild(tituloDia);

      citasPorDia[fecha].forEach(cita => {
        const div = document.createElement("div");
        div.classList.add("cita-item");

        div.innerHTML = `
          <div>
            <p><strong>${cita.nombre}</strong> - ${cita.servicio}</p>
            <p>${cita.hora}</p>
            <p>${cita.email}</p>
          </div>
          <button onclick="eliminarCita(${cita.id})">Eliminar</button>
        `;

        citasList.appendChild(div);
      });
    });
  }

  window.eliminarCita = id => {
    if (!confirm("¿Eliminar esta cita?")) return;
    citas = citas.filter(c => c.id !== id);
    localStorage.setItem("citas", JSON.stringify(citas));
    renderCitas();
  };

  exportarBtn.addEventListener("click", () => {
    const filtradas = citas.filter(c => c.barbero === barberoActivo);
    if (!filtradas.length) return alert("No hay citas para exportar.");

    const csv =
      "Nombre,Correo,Servicio,Fecha,Hora,Barbero\n" +
      filtradas
        .map(c => `${c.nombre},${c.email},${c.servicio},${c.fecha},${c.hora},${c.barbero}`)
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `citas_${barberoActivo.replace(/ /g, "_")}.csv`;
    link.click();
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("barberoActivo");
    window.location.href = "login.html";
  });

  renderCitas();
});
