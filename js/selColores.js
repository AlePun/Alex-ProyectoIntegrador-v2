// ----------------------------------------------------------------------------------
// Selección de colores en el inicio
// 1) Identificar si hay algún local storage con la preferencia
// 2) Cargar los colores de inicio
// 3) Marcar el combo como selected en el elegido
// ----------------------------------------------------------------------------------

function cambioColor(nuevoColor){

    if (nuevoColor == 'combo1') {
        localStorage.setItem('panelTheme', 'combo1')
        
        $(':root').css('--clr-primary', 'var(--clr-blue)')
        $(':root').css('--clr-secondary', 'var(--clr-orange)')
    }
    if (nuevoColor == 'combo2') {
        localStorage.setItem('panelTheme',  'combo2')
        
        $(':root').css('--clr-primary', 'var(--clr-black)')
        $(':root').css('--clr-secondary', 'var(--clr-lightOrange)')
    }
    if (nuevoColor == 'combo3') {
        localStorage.setItem('panelTheme', 'combo3')

        $(':root').css('--clr-primary', 'var(--clr-green)')
        $(':root').css('--clr-secondary', 'var(--clr-red)')
    }
}

function cargarColor(cboSeleccionado) {
    
    if (cboSeleccionado == null) {
        localStorage.setItem('panelTheme', 'combo1')
        cambioColor(localStorage.getItem('combo1'))
        
    } else {
        cambioColor(cboSeleccionado)
    }
}

var elemColorSeleccionado

if  ( localStorage.getItem('panelTheme') == null) 
{   elemColorSeleccionado = document.getElementById('colores').value
} else {
    elemColorSeleccionado = localStorage.getItem('panelTheme')
    document.getElementById('colores').value = localStorage.getItem('panelTheme')
}

cargarColor(elemColorSeleccionado)

var colColores = document.getElementById('colores')

colColores.addEventListener('change', e => {
    e.preventDefault()
    cargarColor(document.getElementById('colores').value)
})