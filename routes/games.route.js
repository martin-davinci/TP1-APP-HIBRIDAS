import { Router } from "express"
import * as gameController from "../controllers/games.controller.js"

const route = Router()

route.get("/juegos", gameController.getJuegos)
route.get("/juegos/nuevo", gameController.nuevoJuegoForm)
route.post("/juegos/nuevo", gameController.guardarJuego)
route.get("/juegos/categoria/:categoria", gameController.obtenerPorCategoria)
route.get("/juegos/editar/:id", gameController.editarJuegoForm)
route.post("/juegos/editar/:id", gameController.editarJuego)
route.get("/juegos/eliminar/:id", gameController.eliminarJuegoForm)
route.post("/juegos/eliminar/:id", gameController.eliminarJuego)
route.get("/juegos/:id", gameController.getJuegoById)

export default route