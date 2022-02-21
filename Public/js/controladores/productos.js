class ProductoController extends ProductoModel {

    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }
    
    async filtrarProductos(categoria, textoFiltrado) {
        // console.log('controller' , categoria, textoFiltrado)
        this.productos = await productoService.filtrarProductosService(categoria, textoFiltrado)
        return this.productos
    }

    async obtenerProducto(id) {
        this.productos = await productoService.obtenerProductosService()
        this.producto = this.productos.find(prod => id == producto.id)
        return this.producto
    }
    
    async obtenerIndiceProducto(id) {
        this.index = this.productos.findIndex(producto => producto.id == id)
        return this.index
    }

    async guardarProducto(producto) {
        let productoGuardado = await productoService.guardarProductoService(producto)
        this.productos.push(productoGuardado)
        renderTablaAlta(null, this.productos)
    }

    async actualizarProducto(id, imagen, nombre, categoria, descripcion, precioLista, precioDto, evaluacion, evaluadores, stock, observacion01, observacion02, observacion03, esPromo, HtmlDesc) {
        
        let index = this.productos.findIndex(producto => producto.id == id)+1
        
        console.log(id)
        console.log(index)
        //console.log(nombre[index].value)
        console.log(categoria)


        let producto = {
            //id: id, 
            'imagen': imagen[index].value, 
            'nombre': nombre[index].value,
            'categoria': categoria[index].value, 
            'descripcion': descripcion[index].value, 
            'precioLista': precioLista[index].value, 
            'precioDto': precioDto[index].value, 
            'evaluacion': evaluacion[index].value, 
            'evaluadores': evaluadores[index].value, 
            'stock': stock[index].value, 
            'observacion01': observacion01[index].value, 
            'observacion02': observacion02[index].value, 
            'observacion03': observacion03[index].value,
            'esPromo': esPromo[index].checked,
            'HtmlDesc': HtmlDesc[index].value,
            'TimeStamp': Date.now
        }
        
        console.log('Paso estos datos: ',id, index, producto)

        let productoActualizado = await productoService.actualizarProductoService(id,producto)
        console.log(productoActualizado)

        // index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index,1,productoActualizado)

        renderTablaAlta(null, this.productos)
    }
    
    ocultarXModalAlta() {            
        elemSectionAlta.classList.remove('seccionAlta-modal--visible')
        mostrarModificacion = false
    }

    async enviarModifAlta() {
        
        var elemSectionAlta = document.getElementsByClassName('seccionAlta-modal')[0]

        elemSectionAlta.innerHTML = '<h2>Producto Modificado...</h2>'
        await productoService.actualizarProducto(producto)
        
        elemSectionAlta.innerHTML = '<h2>Modificando Producto... <b>OK!</b></h2>'
        
        setTimeout(() => {
            elemSectionAlta.classList.remove('seccionAlta-modal--visible')
            mostrarModificacion = false
        },1500)
    }
    
    async borrarProducto(id) {
        console.log('borrarProducto', id)
        
        let productoBorrado = await productoService.borrarProductoService(id)

        let index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        this.productos.splice(index,1)

        renderTablaAlta(null, this.productos)
    }
}

const productoController = new ProductoController()