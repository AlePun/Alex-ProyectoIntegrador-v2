// ----------------------------------------------------------------------------------
// Selección de colores en el inicio
// 1) Identificar si hay algún local storage con la preferencia
// 2) Cargar los colores de inicio
// 3) Marcar el combo como selected en el elegido
// ----------------------------------------------------------------------------------

function cambioColor(){
    //console.log(elemColorSeleccionado)

    if (document.getElementById('colores').value == 'combo1') {
        localStorage.setItem('panelTheme', 'combo1')
        // console.log('Grabé en el local storage, ',localStorage.getItem('panelTheme'))
        $(':root').css('--clr-primary', 'var(--clr-blue)')
        $(':root').css('--clr-secondary', 'var(--clr-orange)')
    }
    if (document.getElementById('colores').value == 'combo2') {
        localStorage.setItem('panelTheme',  'combo2')
        // console.log('Grabé en el local storage, ',localStorage.getItem('panelTheme') )
        $(':root').css('--clr-primary', 'var(--clr-black)')
        $(':root').css('--clr-secondary', 'var(--clr-lightOrange)')
    }
    if (document.getElementById('colores').value == 'combo3') {
        localStorage.setItem('panelTheme', 'combo3')
        // console.log('Grabé en el local storage, ',localStorage.getItem('panelTheme') )
        $(':root').css('--clr-primary', 'var(--clr-green)')
        $(':root').css('--clr-secondary', 'var(--clr-red)')
    }
}

function cargarColor() {
    var localStr = localStorage.getItem('panelTheme')
    if (localStr == '') {
        // console.log('El local está vacío')
    } else {
        cambioColor(localStorage.getItem('panelTheme'))
        // console.log('El local storage tiene: ',localStr)
        // $('#current-theme').text(localStorage.getItem('panelTheme'))
    }
}

var elemColorSeleccionado = document.getElementById('colores').value
var colColores = document.getElementById('colores')

cargarColor()

colColores.addEventListener('change', e => {
    // console.log('Cambio en el combo, la selección es ', document.getElementById('colores').value)
    e.preventDefault()
    cargarColor()
    // console.log('El local storage tiene: ',localStorage.getItem('panelTheme'))
})