function sumarProductoDeseo(id, titulo){
    elemSectionDeseo.innerHTML += `<div class="deseo__item">${titulo},${id}</div>`
}

function sumarProductoCarrito(id, titulo){
    elemSectionCarrito.innerHTML += `<div class="cart__item">${titulo},${id}</div>`
}

async function renderPlantillaListado(listado) {
    let plantillaHbs = await fetch('plantillas/card.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    let html = template({ listado })
    document.getElementsByClassName('cards-container')[0].innerHTML = html
}

function agregarCarrito(e,id,ref) {
    e.preventDefault()
    let producto = productoController.productos.find( producto => producto.id == id )
    carritoController.agregarAlCarrito(producto)    
}

function agregarDeseo(e,id,ref) {
    e.preventDefault()
    let producto = productoController.productos.find( producto => producto.id == id )
    deseoController.agregarAlDeseo(producto)    
}

function masInfo(e,id) {
    e.preventDefault()
    let producto = productoController.productos.find( producto => producto.id == id )
    console.log(id)
    console.log(producto)
    
    //deseoController.agregarAlDeseo(producto)    
}

function sumarCarrito(e,id,ref) {
    e.preventDefault()

    let producto = productoController.productos.find( producto => producto.id == id )
    carritoController.agregarAlCarrito(producto)
}

function sumarDeseo(e,id,ref) {
    e.preventDefault()

    let producto = productoController.productos.find( producto => producto.id == id )
    deseoController.agregarAlDeseo(producto)
}

async function initInicio() {
    var productos = await productoController.obtenerProductos()

    await renderPlantillaListado(productos)
    document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${productos.length} productos`
    function getNombreArchivo(id) {
        return 'views/' + id + '.html'
    }
    
    function ajax2(url, metodo) {
        let xhr = new XMLHttpRequest
        xhr.open(metodo || 'get', url)      // con short circuit operator
        xhr.send()

        return xhr
    }
    
    function cargarMarco(id) {

        let archivo = getNombreArchivo(id)
    
        let xhr = ajax2(archivo)
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let plantilla = xhr.response
                // console.log(id)
                document.getElementsByClassName(id)[0].innerHTML = plantilla
            }
        })
    }

    var elemMarcoCarousel = document.getElementsByClassName('marco-carousel')[0]
    cargarMarco('marco-carousel')

    var elemMarcoBeneficios = document.getElementsByClassName('marco-beneficios')[0]
    cargarMarco('marco-beneficios')

    var elemTestimonials = document.getElementsByClassName('marco-testimonios')[0]
    cargarMarco('marco-testimonios')
}
