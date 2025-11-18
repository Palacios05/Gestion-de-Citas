import { pool } from "../database.js";

export const loginBarbero = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ message: "Usuario y contraseña obligatorios" });
  }

  const [rows] = await pool.query(
    "SELECT id, nombre, usuario, password FROM barberos WHERE usuario = ?",
    [usuario]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }

  const barbero = rows[0];

  if (barbero.password !== password) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }

  // No devolvemos la contraseña
  delete barbero.password;

  res.json(barbero);
};
