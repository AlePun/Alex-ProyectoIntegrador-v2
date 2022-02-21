class FormularioAlta {
    inputs =    null
    form =      null
    buttons =   null

    camposValidos= [false,false,false,false,false,false,false,false,false,false,false,false,false]
    regExpValidar = [
        /^.+$/, //regexp foto           0     
        /^.+$/, //regexp nombre         1
        /^.+$/, //regexp categoria      2
        /^.+$/, //regexp descripcion    3
        /^.+$/, ///^[0-9]+$/, //$Lista  4
        /^.+$/, //regexp $Desc          5
        /^.+$/, //regexp Eval           6
        /^.+$/, //regexp Evaluadores    7
        /^.+$/, //regexp Stock          8
        /^.+$/, //regexp Obs01          9
        /^.+$/, //regexp Obs02          10
        /^.+$/, //regexp Obs03          11 
                // checkbox             12
        /^.+$/, //regexp HTML           13 - TOMA COMO 12
        /^.+$/  //regexp HTML           EXTRA - Este es el 13 real
    ]

    /* -------------  drag and drop  -----------------*/
    dropArea = null
    progressBar = null
    uploadProgress = 0
    imagenSubida = ''
    /* ---------------------------------------------- */

    constructor(renderTablaAlta, guardarProducto) {
        this.forms      = document.querySelector('main form')
        this.inputs     = document.querySelectorAll('main form input')
        this.buttons    = document.querySelector('main form button') 
        
        this.buttons.disabled = true
        
        this.inputs.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    console.log('Paso por Listener', input.value)
                    this.validar(input.value, this.regExpValidar[index], index )
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos )
                })
            }
        })
        
        this.forms.addEventListener('submit', e => {
            e.preventDefault()
    
            let producto = this.leerProductoIngresado()
            //console.log(producto)
            this.limpiarFormulario()
            verAltaProducto()

            if(guardarProducto) guardarProducto(producto)
        })

        /* -------------  drag and drop  -----------------*/
        // this.dropArea = document.getElementById('drop-area')
        // this.prsBar = document.getElementById('progress-bar')

        // ;['dragenter','dragover','dragleave','drop'].forEach(eventName => {
        //     this.dropArea.addEventListener(eventName, e => e.preventDefault())
        //     document.body.addEventListener(eventName, e => e.preventDefault())
        // })

        // ;['dragenter','dragover'].forEach(eventName => {
        //     this.dropArea.addEventListener(eventName, () => this.dropArea.classList.add('highlight'))
        // })

        // ;['dragleave','drop'].forEach(eventName => {
        //     this.dropArea.addEventListener(eventName, () => this.dropArea.classList.remove('highlight'))
        // })

        /* ---------------------------------------------- */

    }
    
    setCustomValidityJS = function(mensaje, index) {
        let divs = document.querySelectorAll('.Mensaje')
        console.log(divs.length)
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje? 'block' : 'none'
    }

    algunCampoNoValido() {
        let valido = 
            //this.camposValidos[0] &&
            this.camposValidos[1] && 
            this.camposValidos[2] && 
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5] &&
            this.camposValidos[6] &&
            this.camposValidos[7] &&
            this.camposValidos[8] &&
            this.camposValidos[9] &&
            this.camposValidos[10] &&
            this.camposValidos[11] //&&
            // this.camposValidos[12] &&
            // this.camposValidos[13] &&
        
            console.log('Validador', valido)
        return !valido
    }

    validar(valor, validador, index) {
        
        console.log(valor, validador, index)

        if(!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es válido',index)
            this.camposValidos[index] = false
            console.log(index, camposValidos[index])
            this.button.disabled = true
            return null
        }

        this.camposValidos[index] = true
        this.buttons.disabled = this.algunCampoNoValido()

        this.setCustomValidityJS('',index)
        return valor
    }

    leerProductoIngresado() {
        
        return {
            imagen: this.inputs[0].value,
            nombre: this.inputs[1].value,
            categoria: this.inputs[2].value,
            descripcion: this.inputs[3].value,
            precioLista: this.inputs[4].value,
            precioDto: this.inputs[5].value,
            evaluacion: this.inputs[6].value,
            evaluadores: this.inputs[7].value,
            stock: this.inputs[8].value,
            observacion01: this.inputs[9].value,
            observacion02: this.inputs[10].value,
            observacion03: this.inputs[11].value,
            esPromo: this.inputs[12].checked,
            HtmlDesc: this.inputs[13].value
        }
    }

    limpiarFormulario() {
        //borro todos los input
        this.inputs.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false
        })
    
        this.buttons.disabled = true
        this.camposValidos = [false,false,false,false,false,false,false,false,false,false,false,false,false]
    }
}

function renderTablaAlta(validos, productos) {

    const xhr = new XMLHttpRequest
    xhr.open('get','plantillas/abmc_producto.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let plantillaHbs = xhr.response

            var template = Handlebars.compile(plantillaHbs);
            let html = template({ productos, validos })
            document.getElementById('listado-productos').innerHTML = html
        }
    })
    xhr.send()
}

/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */
let formularioAlta = null

async function initAlta() {
    // console.warn('initAlta()')

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    let productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}


function verAltaProducto(){
    let formulario = document.querySelector('#FormularioDeAltaProducto')
    formulario.classList.toggle('verAltaProducto')
    formulario.classList.toggle('noVerAltaProducto')
}

async function verModifProducto(id){

    // sabiendo el Id debo determinar el índice
    let productos = await productoController.obtenerProductos()
    let indice =  await productoController.obtenerIndiceProducto(id)
    // console.log(id, indice)
    
    let consultas = document.getElementsByClassName('ConsultaProducto')[indice]
    let ediciones = document.getElementsByClassName('ModificacionProducto')[indice]
    let inputs = document.querySelectorAll('.ModificacionProducto input')
    
    // console.log(consultas)
    // console.log(ediciones)
    // console.log(inputs)

    //consultas.classList.toggle('consultaProducto')
    consultas.classList.toggle('noVerConsultaProducto')

    //ediciones.classList.toggle('verEdicionProducto')
    ediciones.classList.toggle('noVerEdicionProducto')
}