export function createPage(title, content) {
    let html = ""
    html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>"
    html += `<title>BoxGaming</title>`
    html += `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/style.css">
        <link rel="icon" href="/img/iconos/logo1.png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Michroma&display=swap" rel="stylesheet">
        </head><body>`
    
    html += `
    <nav class="navbar bg-body-tertiary fixed-top m-0 p-0">
        <div class="b-navegacion container-fluid p-4">
            <a class="titulo" href="/juegos">BoxGaming</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#panel_navegacion" aria-controls="panel_navegacion" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="panel_navegacion" aria-labelledby="panel_navegacionLabel" role="dialog">
                <div class="offcanvas-header d-flex justify-content-between pt-4">
                    <h2 class="titulo offcanvas-title text-light" id="panel_navegacionLabel">BoxGaming</h2>
                    <button type="button" class="btn-cruz fs-5" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav flex-grow-1 pe-3">
                        <li class="nav-item"><a class="nav-link" href="/">Inicio</a></li>
                        <li class="nav-item"><a class="nav-link" href="/juegos/categoria/Cooperativo">Cooperativo</a></li>
                        <li class="nav-item"><a class="nav-link" href="/juegos/categoria/Terror">Terror</a></li>
                        <li class="nav-item"><a class="nav-link" href="/juegos/categoria/Indie">Indie</a></li>
                        <li class="nav-item"><a class="nav-link" href="/juegos/categoria/Acción">Acción</a></li>
                        <li class="nav-item"><a class="nav-link" href="/juegos/categoria/Supervivencia">Supervivencia</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>`

    html += content
    html += `</div>`
    
    html += `
    <footer>
        <div class="divisor container-fluid"></div>
        <div class="contenido">
            <div class="informacion p-5 container-sm">
                <h2 class="info-titulo"><a href="#inicio">BoxGaming</a></h2>
                <div class="redes">
                    <a href="https://www.instagram.com/" target="_blank"><img class="modal-redes" src="/img/iconos/instagram.png" alt="icono de la red social de Instagram"></a>
                    <a href="https://x.com/?lang=es" target="_blank"><img class="modal-redes" src="/img/iconos/Twitter.png" alt="icono de la red social de Twitter"></a>
                    <a href="https://www.tiktok.com/" target="_blank"><img class="modal-redes" src="/img/iconos/tiktok.png" alt="icono de la red social de Tik Tok"></a>
                    <a href="https://www.facebook.com/" target="_blank"><img class="modal-redes" src="/img/iconos/facebook.png" alt="icono de la red social de Facebook"></a>
                </div>
                <a href="https://www.google.com/search?q=politica+de+privacidad" target="_blank" class="politica-text d-flex justify-content-center">Política de Privacidad</a>
            </div>
        </div>
        <p class="copy text-center">copyright &copy; | BoxGaming - Todos los derechos reservados.</p>
    </footer>`

    html += `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script></body></html>`
    
    return html
}

export function creategamePage(juegos) {
    return createPage("Juegos", createList(juegos))
}

export function pageError(code, message) {
    let content = `<div class="alert alert-danger my-3">${code}: ${message}</div><a href="/" class="btn btn-primary">Volver al inicio</a>`
    return createPage("Error", content)
}

export default { createPage, creategamePage, pageError }