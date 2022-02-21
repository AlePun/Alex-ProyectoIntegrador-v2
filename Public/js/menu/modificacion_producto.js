//var elemSectionModif = document.getElementsByClassName('seccionAlta-modal')[0]

var btnModif = document.getElementsByClassName('accionesAlta__modificarProducto')
console.log(btnModif)

let mostrarModificacion = false

async function renderTablaProducto(producto) {
    var elemSectionModif = document.getElementsByClassName('seccionAlta-modal')[0]

    let plantillaHbs = await fetch('../plantillas/abmc_producto_modalEdit.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    let html = template({ producto })
    elemSectionModif.innerHTML = html
    elemSectionModif.classList.add('seccionAlta-modal--visible')
}

function initModificacion() {
    
    btnModif.forEach(() => {
        btnModif.addEventListener('click', async function () {
            mostrarModificacion = !mostrarModificacion
            console.log('Click en el BTN de modificaciones, con mostrarModificacionProducto: ' , mostrarModificacion)
            if(mostrarModificacion) {
                await renderTablaAlta()
            }
            else {
                elemSectionModif.classList.remove('seccionAlta-modal--visible')
            }
        })
    })
}

initModificacion()