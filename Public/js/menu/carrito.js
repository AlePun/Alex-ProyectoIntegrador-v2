var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]


let mostrarCarrito = false

async function renderTablaCarrito(carrito) {
    //console.log(carrito)
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
    let plantillaHbs = await fetch('../plantillas/carrito.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    let html = template({ carrito })
    elemSectionCarrito.innerHTML = html
    elemSectionCarrito.classList.add('section-carrito--visible')
}

function initCarrito() {

    btnCarrito.addEventListener('click', async function () {
        mostrarCarrito = !mostrarCarrito
        
        if(mostrarCarrito) {
            await renderTablaCarrito(carritoController.carrito)
        }
        else {
            elemSectionCarrito.classList.remove('section-carrito--visible')
        }
    })
}

initCarrito()