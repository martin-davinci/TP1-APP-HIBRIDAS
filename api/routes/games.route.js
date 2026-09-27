import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"

const router = Router()

router.get("/api/juegos", gameController.getJuegos)
router.get("/api/juegos/:id", gameController.getJuegoById)
router.post("/api/juegos", gameController.saveJuego)
router.put("/api/juegos/:id", gameController.replaceJuego)
router.patch("/api/juegos/:id", gameController.updateJuego)
router.delete("/api/juegos/:id", gameController.deleteJuego)

export default router