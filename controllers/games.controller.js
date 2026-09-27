import { createDetailPage, creategamePage } from "../views/games.view.js"
import * as gameService from "../services/games.service.js"
import * as gameView from "../views/games.view.js"

import * as service from '../services/games.service.js'
import * as view from '../views/games.view.js'

export async function obtenerPorCategoria(req, res) {
    const { categoria } = req.params

    const juegos = await service.obtenerJuegosPorCategoria(categoria)
    
    res.send(view.juegosPorCategoriaPage(juegos, categoria))
}

export async function getJuegos(req, res) {
    const { categoria } = req.query
    const todosLosJuegos = await service.getJuegos()

    if (categoria) {
        const juegosFiltrados = todosLosJuegos.filter(
            juego => juego.categoria && juego.categoria.toLowerCase() === categoria.toLowerCase()
        )
        const todasLasCategorias = todosLosJuegos.map(j => j.categoria)
        
        res.send(view.creategamePage(juegosFiltrados, categoria, todasLasCategorias))
    } else {
        res.send(view.creategamePage(todosLosJuegos))
    }
}

export async function getJuegoById(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getJuegoById(id)
        res.send(createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError("404", "Juego no encontrado"))
    }
}

export async function nuevoJuegoForm(req, res) {
    try {
        res.send(gameView.nuevoJuegoForm())
    } catch (error) {
        res.send(gameView.pageError("404", "Página no encontrada"))
    }
}

export async function guardarJuego(req, res) {
    console.log(req.body)
    try {
        const juego = await gameService.guardarJuego(req.body)
        res.send(createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError("400", "No se pudo agregar el juego"))
    }
}

export async function editarJuegoForm(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getJuegoById(id)
        res.send(gameView.editarJuegoForm(juego))
    } catch (error) {
        res.send(gameView.pageError("400", "No se pudo editar el juego"))
    }
}

export async function editarJuego(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.editarJuego(id, req.body)
        res.send(createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError("400", "No se pudo editar el juego"))
    }
}

export async function eliminarJuegoForm(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getJuegoById(id)
        res.send(gameView.eliminarJuegoForm(juego))
    } catch (error) {
        res.send(gameView.pageError("400", "No se pudo borrar el juego"))
    }
}

export async function eliminarJuego(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.eliminarJuegoLogico(id)
        res.send(gameView.createDetailPage(juego))
    } catch (error) {
        res.send(gameView.pageError("400", "No se pudo borrar el juego"))
    }
}