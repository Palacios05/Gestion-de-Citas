import { Router } from "express";
import {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita
} from "../controllers/citas.controller.js";

const router = Router();

router.get("/", getCitas);
router.get("/:id", getCita);
router.post("/", createCita);
router.put("/:id", updateCita);
router.delete("/:id", deleteCita);

export default router;
