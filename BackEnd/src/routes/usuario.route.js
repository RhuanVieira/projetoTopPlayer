import express from "express";
import * as usuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.post("/login", usuarioController.login);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.deletar);

export default router;