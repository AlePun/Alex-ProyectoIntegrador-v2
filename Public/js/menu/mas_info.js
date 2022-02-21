let elemSectionDetalleProducto = document.getElementsByClassName('section-detalleProducto')[0]
// var btnDeseo = document.getElementsByClassName('search-bar__deseo-container')[0]
let mostrarDetalleProducto = false
let error = 0

async function renderDetalleProducto(producto) {
    
    if (producto[0] === undefined) {
        console.log('Producto indefinido - Revisar porque entra acá - Es para controlar el detalle de producto en blanco')
    } else {
        // console.log('Producto definido')
        let plantillaHbs = await fetch('plantillas/detalle_producto.hbs').then(r => r.text())
        var template = Handlebars.compile(plantillaHbs);
        let html = template({producto})
        
        // console.log(producto)
        elemSectionDetalleProducto.innerHTML = html
        elemSectionDetalleProducto.classList.add('section-detalleProducto--visible')
    }

}

async function initDetalleProducto(producto) {
        mostrarDetalleProducto = !mostrarDetalleProducto

        let arrayProducto= [producto]

        if(mostrarDetalleProducto) {
            await renderDetalleProducto(arrayProducto)
        }
        else {
            elemSectionDetalleProducto.classList.remove('section-detalleProducto--visible')
        }
}

initDetalleProducto()