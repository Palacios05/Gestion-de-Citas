import { Router } from "express";
import { loginBarbero } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginBarbero);

export default router;
