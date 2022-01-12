function initElemIndex() {

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