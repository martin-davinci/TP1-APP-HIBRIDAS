import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:ah-parcial1@ah.ynfwpdb.mongodb.net/?appName=AH"

const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function obtenerJuegosPorCategoria(categoria) {
    const juegos = await getJuegos()
    
    return juegos.filter(juego => 
        juego.categoria && juego.categoria.toLowerCase() === categoria.toLowerCase()
    )
}

export async function getJuegos(filtros = {}) {
    const filter = { eliminado: { $ne: true } }

    if (filtros?.categoria) {
        filter.categoria = filtros.categoria
    }

    const juegos = await db.collection("juegos")
        .find(filter)
        .toArray()

    return juegos
}

export async function getJuegoById(id) {
    const juego = await db.collection("juegos").findOne({ _id: new ObjectId(id) })
    return juego
}

export async function guardarJuego(juego) {
    await db.collection("juegos").insertOne(juego)
    return juego
}

export async function editarJuego(id, juego) {
    await db.collection("juegos").replaceOne({ _id: new ObjectId(id) }, juego)
    return juego
}

export async function eliminarJuegoFisico(id) {
    let juego = await getJuegoById(id)
    await db.collection("juegos").deleteOne({ _id: new ObjectId(id) })
    return juego
}

export async function eliminarJuegoLogico(id) {
    let juego = await getJuegoById(id)
    await db.collection("juegos").updateOne(
        { _id: new ObjectId(id) },
        { $set: { eliminado: true } }
    )
    return juego
}