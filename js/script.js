document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("7sEv3MBRlQdzz3qhb");

  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const barberSelect = document.getElementById("barber");
  const bookingSection = document.querySelector(".booking-section");
  let citas = JSON.parse(localStorage.getItem("citas")) || [];

  // ===== Notificación visual =====
  function notificar(msg, tipo = "info") {
    const div = document.createElement("div");
    div.className = `notificacion ${tipo}`;
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3500);
  }

  // ===== Generar horarios =====
  function generarHorarios(inicio = "08:00", fin = "18:00") {
    timeSelect.innerHTML = '<option value="">Selecciona un horario</option>';
    let [h, m] = inicio.split(":").map(Number);
    const [finH, finM] = fin.split(":").map(Number);
    while (h < finH || (h === finH && m < finM)) {
      const horaStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const option = document.createElement("option");
      option.value = horaStr;
      option.textContent = horaStr;
      timeSelect.appendChild(option);
      m += 30;
      if (m >= 60) { h++; m = 0; }
    }
  }

  // ===== Control de disponibilidad =====
  function actualizarDisponibilidad() {
    const fecha = dateInput.value;
    const barbero = barberSelect.value;
    generarHorarios();
    if (!fecha || !barbero) return;

    const ocupadas = citas
      .filter(c => c.fecha === fecha && c.barbero === barbero)
      .map(c => c.hora);

    for (let opt of timeSelect.options)
      if (ocupadas.includes(opt.value)) {
        opt.disabled = true;
        opt.textContent += " — (Ocupado)";
      }

    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split("T")[0];
    if (fecha === fechaHoy) {
      const horaActual = hoy.getHours() * 60 + hoy.getMinutes();
      for (let opt of timeSelect.options) {
        const [h, m] = opt.value.split(":").map(Number);
        const minutos = h * 60 + m;
        if (minutos <= horaActual) {
          opt.disabled = true;
          opt.textContent += " — (Hora pasada)";
        }
      }
    }
  }

  dateInput.addEventListener("change", actualizarDisponibilidad);
  barberSelect.addEventListener("change", actualizarDisponibilidad);

  // ===== Guardar cita =====
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nuevaCita = {
      id: Date.now(),
      nombre: form.name.value.trim(),
      email: form.email.value.trim(),
      servicio: form.service.value,
      barbero: form.barber.value,
      fecha: form.date.value,
      hora: form.time.value
    };

    if (!Object.values(nuevaCita).every(v => v))
      return notificar("Completa todos los campos.", "error");

    const fechaSeleccionada = new Date(nuevaCita.fecha + "T" + nuevaCita.hora);
    if (fechaSeleccionada < new Date())
      return notificar("Fecha/hora no válida.", "error");

    if (citas.some(c => c.fecha === nuevaCita.fecha && c.hora === nuevaCita.hora && c.barbero === nuevaCita.barbero))
      return notificar("Ese barbero ya tiene una cita.", "warning");

    citas.push(nuevaCita);
    localStorage.setItem("citas", JSON.stringify(citas));

    // ===== Envío de correo =====
    const templateParams = {
      to_name: nuevaCita.nombre,
      to_email: nuevaCita.email,
      service: nuevaCita.servicio,
      date: nuevaCita.fecha,
      time: nuevaCita.hora,
      barber: nuevaCita.barbero
    };

    emailjs.send("service_75u26oa", "template_2sfy286", templateParams)
      .then(() => notificar("✅ Cita registrada y correo enviado correctamente.", "success"))
      .catch(() => notificar("Cita guardada, pero error al enviar correo.", "warning"));

    form.reset();
  });

  // ===== Aparición suave del formulario =====
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bookingSection.classList.add("visible");
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(bookingSection);

  // ===== Inicialización =====
  generarHorarios();
  const hoy = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", hoy);
});
