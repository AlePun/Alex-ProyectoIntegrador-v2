class DeseoController extends DeseoModel {

    constructor() {
        super()
        try {
            this.deseo = JSON.parse(localStorage.getItem('deseo')) || []
        }
        catch {
            this.deseo = []
            localStorage.setItem('deseo',this.deseo)
        }
    }

    elProductoEstaEnElDeseo(producto) {
        return this.deseo.filter(prod => prod.id == producto.id).length
    }
    
    obtenerProductoDeDeseo(producto) {
        return this.deseo.find(prod => prod.id == producto.id)
    }
    
    agregarAlDeseo(producto) {
        if(!this.elProductoEstaEnElDeseo(producto)) {
            producto.cantidad = 1
            this.deseo.push(producto)
        }
        else {
            let productoDeDeseo = this.obtenerProductoDeDeseo(producto)
            productoDeDeseo.cantidad++
        }   
    
        localStorage.setItem('deseo', JSON.stringify(this.deseo))
    }
    
    async borrarProductoDeseo(id) {
        let index = this.deseo.findIndex(producto => producto.id == id)
        this.deseo.splice(index,1)
        localStorage.setItem('deseo', JSON.stringify(this.deseo))
    
        await renderTablaDeseo(this.deseo)
    }
    
    async sumarProductoDeseo(id) {
        let index = this.deseo.findIndex(producto => producto.id == id)
        this.deseo[index].cantidad++
        localStorage.setItem('deseo', JSON.stringify(this.deseo))
    
        await renderTablaDeseo(this.deseo)    
    }

    async restarProductoDeseo(id) {
        let index = this.deseo.findIndex(producto => producto.id == id)
        if(this.deseo[index].cantidad>1){
            this.deseo[index].cantidad--
            localStorage.setItem('deseo', JSON.stringify(this.deseo))
        }
        
        await renderTablaDeseo(this.deseo)    
    }

    ocultarXDeseo() {            
        elemSectionDeseo.classList.remove('section-deseo--visible')
        mostrarDeseo = false
    }

    //  -------------------------------------------------------------------
    // Revisar todo este código... 
    //  -------------------------------------------------------------------

    async pasarDeseoACarrito() {
        let text = "Estás seguro que querés pasar tus deseos al carrito?\nSe acumularán los productos seleccionados en ambos!";
        if (confirm(text) == true) {
            var elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]
            elemSectionDeseo.innerHTML = '<h2>Enviando deseos a Carrito...</h2>'

            if(this.deseo) {
                
                for(var i in this.deseo){
                    let cantidad= this.deseo[i].cantidad
                    console.log('La cantidad es de: ', cantidad)
                    
                    for(var q=0 ; q < cantidad; q++) {
                        console.log(q,' de ', cantidad)
                        carritoController.agregarAlCarrito(this.deseo[i])
                    }
                }

                this.deseo = [] 
                localStorage.setItem('deseo', this.deseo)
                
                elemSectionDeseo.innerHTML = '<h2>Enviando deseo... <b>OK!</b></h2>'
                setTimeout(() => {
                    elemSectionDeseo.classList.remove('section-deseo--visible')
                    mostrarDeseo = false
                },1500)    
                text = "You pressed OK!";
            } else{
                console.log('Sin elementos en la lista de desos...')
                text='Sin elementos en la lista de desos...'
            }
        } else {
            console.log('Cancelamos!!!')
            text = 'You canceled!'
        }
        // return text
    }

    async enviarDeseo() {
        var elemSectionDeseo = document.getElementsByClassName('section-deseo')[0]

        elemSectionDeseo.innerHTML = '<h2>Enviando deseo...</h2>'
        await DeseoService.guardarDeseoService(this.deseo)

        this.deseo = []
        localStorage.setItem('deseo',this.deseo)
    
        elemSectionDeseo.innerHTML = '<h2>Enviando deseo... <b>OK!</b></h2>'
    
        setTimeout(() => {
            elemSectionDeseo.classList.remove('section-deseo--visible')
            mostrarDeseo = false
        },1500)
    }
}

const deseoController = new DeseoController()