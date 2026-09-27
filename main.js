import express from "express"
import juegosRoute from "./routes/games.route.js"
import juegosApiRoute from "./api/routes/games.route.js"

const app = express()

app.use("/", express.static("public"))
app.get('/', (req, res) => {res.redirect('/juegos')})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(juegosRoute)
app.use(juegosApiRoute)

app.listen(3333, () => console.log("Funcionando... en http://localhost:3333"))