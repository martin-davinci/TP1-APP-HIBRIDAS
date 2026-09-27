import * as gameService from "../../services/games.service.js"

export async function getJuegos(req, res) {
    try {
        const filtros = req.query
        const juegos = await gameService.getJuegos(filtros)
        res.status(200).json(juegos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getJuegoById(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.getJuegoById(id)
        if (juego) {
            res.status(200).json(juego)
        } else {
            res.status(404).json({ message: "Juego no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function saveJuego(req, res) {
    try {
        console.log(req.body)
        const juego = await gameService.guardarJuego(req.body)

        if (juego) {
            res.status(201).json(juego)
        } else {
            res.status(400).json({ message: "El nombre del juego ya esta registrado" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function deleteJuego(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.eliminarJuegoLogico(id)
        if (juego) {
            res.status(200).json(juego)
        } else {
            res.status(404).json({ message: "Juego no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar el juego" })
    }
}

export async function replaceJuego(req, res) {
    try {
        const id = req.params.id
        const juego = await gameService.editarJuego(id, req.body)
        if (juego) {
            res.status(200).json(juego)
        } else {
            res.status(404).json({ message: "Juego no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar el juego" })
    }
}

export async function updateJuego(req, res) {
    try {
        const id = req.params.id
        const juegoActual = await gameService.getJuegoById(id)

        if (!juegoActual) {
            return res.status(404).json({ message: "Juego no encontrado" })
        }

        req.body = {
            "nombre": req.body.nombre ?? juegoActual.nombre,
            "descripcion": req.body.descripcion ?? juegoActual.descripcion,
            "categoria": req.body.categoria ?? juegoActual.categoria,
            "desarrollador": req.body.desarrollador ?? juegoActual.desarrollador,
            "plataforma": req.body.plataforma ?? juegoActual.plataforma,
            "imagen": req.body.imagen ?? juegoActual.imagen
        }

        const juego = await gameService.editarJuego(id, req.body)
        res.status(200).json(juego)

    } catch (error) {
        res.status(500).json({ message: "No se pudo actualizar el juego" })
    }
}