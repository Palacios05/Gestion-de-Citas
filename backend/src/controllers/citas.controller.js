import { pool } from "../database.js";

export const getCitas = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM citas ORDER BY fecha, hora");
  res.json(rows);
};

export const getCita = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM citas WHERE id = ?", [
    req.params.id
  ]);
  if (rows.length === 0) return res.status(404).json({ message: "Cita no encontrada" });
  res.json(rows[0]);
};

export const createCita = async (req, res) => {
  const { nombre, email, barbero, servicio, fecha, hora } = req.body;

  if (!nombre || !email || !barbero || !servicio || !fecha || !hora) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  const [result] = await pool.query(
    "INSERT INTO citas(nombre, email, barbero, servicio, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, email, barbero, servicio, fecha, hora]
  );

  res.status(201).json({
    id: result.insertId,
    nombre, email, barbero, servicio, fecha, hora
  });
};

export const updateCita = async (req, res) => {
  const { nombre, email, barbero, servicio, fecha, hora } = req.body;

  await pool.query(
    "UPDATE citas SET nombre=?, email=?, barbero=?, servicio=?, fecha=?, hora=? WHERE id=?",
    [nombre, email, barbero, servicio, fecha, hora, req.params.id]
  );

  res.json({ message: "Cita actualizada" });
};

export const deleteCita = async (req, res) => {
  await pool.query("DELETE FROM citas WHERE id = ?", [req.params.id]);
  res.json({ message: "Cita eliminada" });
};
