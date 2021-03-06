class Main {
    async ajax(url, metodo='get') {    // argumentos con valores por default
        return await fetch(url, { method: metodo }).then(r => r.text())
    }

    getNombreArchivo(id) {
        return 'views/' + id + '.html'
    }

    marcarLink(id) {
        let links = document.querySelectorAll('header nav a')
        // let links = document.querySelectorAll('header')
        
        links.forEach( link => {
            link.classList.remove('nav-bar__nav-link-active')
            if (link.id == id) {
                link.classList.add('nav-bar__nav-link-active')
            } else {
                link.classList.remove('nav-bar__nav-link-active')
            }
        })
    }

    initJS(id) {

        if(id == 'alta') {
            initAlta()
        }
        else if(id == 'inicio') {
            initInicio()
        }
        else if(id == 'nosotros') {
            initNosotros()
        }
        else if(id == 'contacto') {
            initContacto()
        }
        else if(id == 'usuario') {
            initUsuario()
        }

    }

    async cargarPlantilla(id) {
        let archivo = this.getNombreArchivo(id)

        let plantilla = await this.ajax(archivo)
        // Carga del código de vista (HTML) de la plantilla
        let main = document.querySelector('main')
        main.innerHTML = plantilla
        
        // Carga del código script (JS) de la plantilla
        this.initJS(id)
        // Adiciono la siguiente línea para resolver la caída del menú
        $('html, body').animate({ scrollTop: 0 }, 'smooth');// nueve al top of page con animación
        // scroll(0,0) sin animación
    }

    async cargarPlantillas() {
        /* --------------------------------------------------------- */
        /* Carga inicial de la vista determinada por la url visitada */
        /* --------------------------------------------------------- */
        let id = location.hash.slice(1) || 'inicio'
        this.marcarLink(id)
        await this.cargarPlantilla(id)
        

        /* ------------------------------------------------------------- */
        /* Carga de cada uno de los contenidos según la navegación local */
        /* ------------------------------------------------------------- */
        let links = document.querySelectorAll('header nav a')
        let btnBuscar = document.querySelector('#btnBuscar')
        let btnUsuario = document.querySelector('#usuario')

        btnBuscar.addEventListener('click', e => {
            e.preventDefault()
            //console.log('click en buscar')
            let cateSeleccionada = document.querySelector('#TipoProducto').value
            let textoBuscado = document.querySelector('#buscar').value
            // console.log(cateSeleccionada + ' '+textoBuscado)
            if(!cateSeleccionada == '' || !textoBuscado=='') {
                // console.log('Filtro activo')
                initBuscar(cateSeleccionada, textoBuscado)
            }

            // let id = link.id
            // location.hash = id
        })

        btnUsuario.addEventListener('click', e => {
            e.preventDefault()
            console.log('click en usuario')
            // let id = link.id
            // location.hash = id
        })



        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
                let id = link.id
                location.hash = id
            })
        })
        window.addEventListener('hashchange', async () => {
            let id = location.hash.slice(1) || 'inicio'
            this.marcarLink(id)
            await this.cargarPlantilla(id)
        })
    }
    
    async start() {
        await this.cargarPlantillas()
    }
}
const main = new Main()
main.start()
