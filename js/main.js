function start() {

    function ajax(url, metodo) {
        let xhr = new XMLHttpRequest
        xhr.open(metodo || 'get', url)      // con short circuit operator
        xhr.send()

        return xhr
    }

    function getNombreArchivo(id) {
        return 'views/' + id + '.html'
    }

    function marcarLink(id) {
        let links = document.querySelectorAll('header nav a')
        links.forEach(link => {
            if(link.id == id) link.classList.add('nav-bar__nav-link-active')
            else link.classList.remove('nav-bar__nav-link-active')
        })
    }

    function initJS(id) {
        if(id == 'inicio') {
            initInicio()
            initElemIndex()
        }
        else if(id == 'alta') {
            initAlta()
        }
        else if(id == 'contacto') {
            initContacto()
        }
        else if(id == 'nosotros') {
            initNosotros()
        }                
    }

    function cargarPlantilla(id) {
        let archivo = getNombreArchivo(id)
        let xhr = ajax(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let plantilla = xhr.response
                // console.log('paso por aca -- borrar')
                /* Cargo la plantilla HTML en la vista, por debajo de la navegación */
                document.querySelector('main').innerHTML = plantilla

                /* Cargo el script JS que va a manejar la funcionalidad de la plantilla inyectada */
                initJS(id)
            }
        })
    }

    function cargarPlantillas() {
        let links = document.querySelectorAll('header nav a')

        /* ----------------------------------------------------------------- */
        /*                     Carga de la vista inicial                     */
        /* ----------------------------------------------------------------- */
        let id = location.hash.slice(1) || 'inicio'
        marcarLink(id)
        cargarPlantilla(id)
        //console.log('Carga inicial')

        /* ----------------------------------------------------------------------- */
        /*         Carga de la vistas dinámicas por parte de la navegación         */
        /* ----------------------------------------------------------------------- */
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()

                let id = link.id
                //console.log(id)
                location.hash = id
            })
        })

        window.addEventListener('hashchange', () => {
            //console.log('Cambió la URL')
            let id = location.hash.slice(1) || 'inicio'
            marcarLink(id)
            cargarPlantilla(id)
        })
    }

    cargarPlantillas()
}

start()
