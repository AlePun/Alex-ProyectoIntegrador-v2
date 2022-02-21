let elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]
var btnDeseo = document.getElementsByClassName('search-bar__deseo-container')[0]
let mostrarDeseo = false

async function renderTablaDeseo(deseo) {
    let plantillaHbs = await fetch('plantillas/deseo.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    
    let html = template({ deseo })
    elemSectionDeseo.innerHTML = html
    elemSectionDeseo.classList.add('section-deseo--visible')
    //console.log(elemSectionDeseo)
}

function initDeseo() {
    btnDeseo.addEventListener('click', async function (e) {
        e. preventDefault()
        mostrarDeseo = !mostrarDeseo
        if(mostrarDeseo) {
            await renderTablaDeseo(deseoController.deseo)
        }
        else {
            elemSectionDeseo.classList.remove('section-deseo--visible')
        }
    })
}

initDeseo()