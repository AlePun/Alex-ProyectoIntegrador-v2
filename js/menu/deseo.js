let elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]
var btnDeseo = document.getElementsByClassName('search-bar__deseo-container')[0]
let mostrarDeseo = false

async function renderTablaDeseo(deseo) {
    // var elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]
    
    let plantillaHbs = await fetch('plantillas/deseo.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    let html = template({ deseo })
    //console.log(html)
    elemSectionDeseo.innerHTML = html
    elemSectionDeseo.classList.add('section-deseo--visible')
    console.log(elemSectionDeseo)
}

function initDeseo() {
    // var btnDeseo = document.getElementsByClassName('search-bar__deseo-container')[0]
    // var elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]

    btnDeseo.addEventListener('click', async function (e) {
        e. preventDefault()
        //console.log('Click en el btn Deseo')
        mostrarDeseo = !mostrarDeseo
        //console.log(mostrarDeseo)
        if(mostrarDeseo) {
            //console.log(deseoController.deseo)
            await renderTablaDeseo(deseoController.deseo)
        }
        else {
            elemSectionDeseo.classList.remove('section-deseo--visible')
        }
    })
}

initDeseo()