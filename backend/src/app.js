import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import citasRoutes from "./routes/citas.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/citas", citasRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en puerto " + process.env.PORT)
);
