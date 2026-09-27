import { createPage } from "../page/utils.js"

export function juegosPorCategoriaPage(juegos, categoria) {
    const titulo = `Juegos de ${categoria}`

    let html = `
    <section class="pt-5 pb-1 container-fluid" id="juegos">
        <div class="titulo-destacados-contenedor mx-auto d-flex justify-content-between align-items-end">
            <h1 class="juego-titulo-destacados mb-0">${titulo}</h1>
            <a href="/juegos" class="nav-link-filtro">Volver</a>
        </div>
        <div class="mt-5">
            <div class="mx-auto">
                <div class="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4 mx-auto div-conten2" id="contenedor-juegos">`

    juegos.forEach(juego => {
        const imagenUrl = juego.imagen || '/img/juegos/hollow1.png'
        const idJuego = juego._id || juego.nombre

        html += `
                    <div class="col">
                        <div class="card h-100">
                            <img class="img card-img-top" src="${imagenUrl}" alt="${juego.nombre || 'Juego'}">
                            <div class="card-body">
                                <h5 class="card-title text-light">${juego.nombre}</h5>
                                <p class="card-text text-muted">${juego.categoria || ''}</p>
                            </div>
                            <a class="btn-comprar btn btn-primary d-flex justify-content-center border-0 rounded-0" href="/juegos/${idJuego}">Ver Más</a>
                        </div>
                    </div>`
    })

    if (juegos.length === 0) {
        html += `
                    <div class="col-12 text-center text-light my-5">
                        <p class="fs-4">No se encontraron juegos en la categoría "${categoria}".</p>
                    </div>`
    }

    html += `
                </div>
            </div>
        </div>
    </section>`

    return createPage(titulo, html)
}

export function creategamePage(juegos, categoriaSeleccionada = null, todasLasCategorias = []) {
    const listaCategorias = todasLasCategorias.length > 0 ? todasLasCategorias : juegos.map(j => j.categoria)
    const categoriasDisponibles = [...new Set(listaCategorias.filter(Boolean))].sort()

    const titulo = categoriaSeleccionada 
        ? `Juegos ${categoriaSeleccionada}` 
        : 'Juegos Populares'

    let html = `
    <section class="pt-5 pb-1 container-fluid" id="juegos">
        <div class="titulo-destacados-contenedor mx-auto d-flex justify-content-between align-items-end">
            <h1 class="juego-titulo-destacados mb-0">${titulo}</h1>
            <div class="d-flex align-items-center gap-3">
                <a href="/juegos/nuevo" class="crear-juego btn btn-primary">Nuevo Juego</a>
                <div class="nav-item dropdown">
                    <a class="juego-titulo-destacados nav-link-filtro dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="drop-lista">Filtrar</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/juegos">Todos</a></li>`

    categoriasDisponibles.forEach(cat => {
        html += `<li><a class="dropdown-item" href="/juegos?categoria=${encodeURIComponent(cat)}">${cat}</a></li>`
    })

    html += `
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <div class="mx-auto">
                <div class="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4 mx-auto div-conten2" id="contenedor-juegos">`

    juegos.forEach(juego => {
        const imagenUrl = juego.imagen || '/img/juegos/hollow1.png'
        const idJuego = juego._id || juego.nombre

        html += `
                    <div class="col">
                        <div class="card h-100">
                            <img class="img card-img-top" src="${imagenUrl}" alt="${juego.nombre || 'Juego'}">
                            <div class="card-body">
                                <h5 class="card-title text-light">${juego.nombre}</h5>
                                <p class="card-text text-muted">${juego.categoria || ''}</p>
                            </div>
                            <a class="btn-comprar btn btn-primary d-flex justify-content-center border-0 rounded-0" href="/juegos/${idJuego}">Ver Más</a>
                        </div>
                    </div>`
    })

    html += `
                </div>
            </div>
        </div>
    </section>`

    return createPage(titulo, html)
}

export function createDetailPage(juego) {
    const idJuego = juego._id || juego.nombre
    const imagenUrl = juego.imagen || '/img/juegos/hollow1.png'

    let html = `
    <section class="pt-5 pb-1 container-fluid" id="productos">
        <div class="cont-detalles mt5">
            <div class="card-detalles h-100">
                <img class="img-detalles" src="${imagenUrl}" alt="${juego.nombre || 'Juego'}">
                <div class="card-body">
                    <h2 class="card-title-detalles fs-6">${juego.nombre || ''}</h2>
                    <p class="descripcion fs-6 m-0 pt-2 pb-2">${juego.descripcion || ''}</p>
                    ${juego.plataforma ? `<p class="descripcion fs-6 m-0 pt-2 pb-2">Plataforma: <a href="${juego.plataforma}" target="_blank">Ver en tienda</a></p>` : ''}
                    <p class="descripcion fs-6 m-0 pt-2 pb-2">Desarrollador: ${juego.desarrollador || ''}</p>
                    ${juego.categoria ? `<p class="descripcion fs-6 m-0 pt-2 pb-2">Categoría: ${juego.categoria}</p>` : ''}
                </div>
                <div class="btn-cont d-flex justify-content-between">
                    <a class="btn-opsiones btn btn-primary d-flex justify-content-center border-0 rounded-0" href="/juegos/editar/${idJuego}">Editar</a>
                    <a class="btn-opsiones btn btn-primary d-flex justify-content-center border-0 rounded-0" href="/juegos/eliminar/${idJuego}">Eliminar</a>
                    <a class="btn-opsiones btn btn-primary d-flex justify-content-center border-0 rounded-0" href="/juegos">Volver</a>
                </div>
            </div>
        </div>
    </section>`

    return createPage(juego.nombre, html)
}

export function pageError(error, mensaje) {
    let html = `<div class="container my-5 text-center">`
    html += `<h2>${error}</h2>`
    html += `<p>${mensaje}</p>`
    html += `<a href="/juegos" class="btn btn-primary">Volver</a>`
    html += `</div>`
    return createPage("Error", html)
}

export function nuevoJuegoForm() {
    let html = `
    <section class="pb-5 d-flex justify-content-center container-fluid">
        <div class="formu2 pt-5 pb-5 container-xl p-4">
            <h2 class="form_juego_titulo text-center">Nuevo Juego</h2>
            <div class="formu mx-auto justify-content-center">
                <form class="form_form_juego container-fluid p-0" action="/juegos/nuevo" method="POST">
                    <div class="mb-3 container-fluid p-0">
                        <label for="nombre" class="form-label text-light">Nombre</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="nombre" name="nombre" placeholder="Nombre del juego" required>
                        <div class="formulario-datos">
                            <label for="desarrollador" class="form-label text-light">Desarrollador</label>
                            <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="desarrollador" name="desarrollador" placeholder="Desarrollador" required>
                            <label for="categoria" class="form-label text-light">Categoría</label>
                            <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="categoria" name="categoria" placeholder="Categoría" required>
                        </div>
                        <label for="plataforma" class="form-label text-light">Plataforma (URL)</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="plataforma" name="plataforma" placeholder="Plataforma" required>
                        <label for="imagen" class="form-label text-light">Imagen (Ruta / URL)</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="imagen" name="imagen" placeholder="URL imagen" required>
                        <label for="descripcion" class="form-label text-light">Descripción</label>
                        <textarea class="for container-fluid mb-3 rounded-3 p-3" id="descripcion" name="descripcion" rows="3" placeholder="Descripción del juego..." required></textarea>
                        <div class="d-flex justify-content-center gap-3">
                            <button class="btn btn-primary d-flex justify-content-center rounded-3" id="env" type="submit">Guardar</button>
                            <a href="/juegos" class="btn btn-primary d-flex justify-content-center rounded-3" id="env">Volver</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    `
    return createPage("Nuevo juego", html)
}

export function editarJuegoForm(juego) {
    let idJuego = juego._id || juego.nombre
    let html = `
    <section class="pb-5 d-flex justify-content-center container-fluid">
        <div class="formu2 pt-5 pb-5 container-xl p-4">
            <h2 class="form_juego_titulo text-center">Editar Juego</h2>
            <div class="formu mx-auto justify-content-center">
                <form class="form_form_juego container-fluid p-0" action="/juegos/editar/${idJuego}" method="POST">
                    <div class="mb-3 container-fluid p-0">
                        <label for="nombre" class="form-label text-light">Nombre</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="nombre" name="nombre" value="${juego.nombre || ''}" placeholder="Nombre del juego" required>

                        <div class="formulario-datos">
                            <label for="desarrollador" class="form-label text-light">Desarrollador</label>
                            <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="desarrollador" name="desarrollador" value="${juego.desarrollador || ''}" placeholder="Desarrollador" required>

                            <label for="categoria" class="form-label text-light">Categoría</label>
                            <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="categoria" name="categoria" value="${juego.categoria || ''}" placeholder="Categoría" required>
                        </div>

                        <label for="plataforma" class="form-label text-light">Plataforma (URL)</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="plataforma" name="plataforma" value="${juego.plataforma || ''}" placeholder="Plataforma" required>

                        <label for="imagen" class="form-label text-light">Imagen (Ruta / URL)</label>
                        <input class="for container-fluid mb-3 rounded-3 p-3" type="text" id="imagen" name="imagen" value="${juego.imagen || ''}" placeholder="URL imagen" required>

                        <label for="descripcion" class="form-label text-light">Descripción</label>
                        <textarea class="for container-fluid mb-3 rounded-3 p-3" id="descripcion" name="descripcion" rows="3" placeholder="Descripción del juego..." required>${juego.descripcion || ''}</textarea>

                        <div class="d-flex justify-content-center gap-3">
                            <button class="btn btn-primary d-flex justify-content-center rounded-3" id="env" type="submit">Guardar Cambios</button>
                            <a href="/juegos" class="btn btn-primary d-flex justify-content-center rounded-3" id="env">Volver</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    `
    return createPage("Editar juego", html)
}

export function eliminarJuegoForm(juego) {
    let idJuego = juego._id || juego.nombre
    let html = `<div class="container my-4">`
    html += `<form action="/juegos/eliminar/${idJuego}" method="POST">`
    html += `<h3>¿Eliminar este juego?</h3>`
    html += `<p><strong>Nombre:</strong> ${juego.nombre || ''}</p>`
    html += `<p><strong>Desarrollador:</strong> ${juego.desarrollador || ''}</p>`
    html += `<p><strong>Categoría:</strong> ${juego.categoria || ''}</p>`
    html += `<p><strong>Descripción:</strong> ${juego.descripcion || ''}</p>`
    html += `<button class="btn btn-danger mt-2">Eliminar Definitivamente</button>`
    html += `</form>`
    html += `<a href="/juegos" class="btn btn-link mt-3">Volver</a></div>`
    return createPage("Eliminar Juego", html)
}