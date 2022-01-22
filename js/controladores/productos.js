class ProductoController extends ProductoModel {

    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async obtenerProducto(id) {
        this.productos = await productoService.obtenerProductosService()
        this.producto = this.productos.find(prod => prod.id == producto.id)
        return this.producto
    }
    
    async obtenerIndiceProducto(id) {
        this.index = this.productos.findIndex(producto => producto.id == id)
        return this.index
    }

    async guardarProducto(producto) {
        
        console.log=('Hola paso por acá y el producto es: ',producto)

        let productoGuardado = await productoService.guardarProductoService(producto)
        this.productos.push(productoGuardado)
        renderTablaAlta(null, this.productos)
    }

    async actualizarProducto(id, imagen, nombre, categoria, descripcion, precioLista, precioDto, evaluacion, evaluadores, stock, observacion01, observacion02, observacion03, esPromo) {
        
        // console.log('actualizarProducto', id, imagen[id].value, nombre, categoria, descripcion, precioLista, precioDto, evaluacion, evaluadores, stock, observacion01, observacion02, observacion03)
        // console.log('actualizarProducto', id, imagen[id].value)
        // console.log(esPromo[id].checked)
        
        let producto = {
            id: id, 
            'imagen': imagen[id].value, 
            'nombre': nombre[id].value, 
            'categoria': categoria[id].value, 
            'descripcion': descripcion[id].value, 
            'precioLista': precioLista[id].value, 
            'precioDto': precioDto[id].value, 
            'evaluacion': evaluacion[id].value, 
            'evaluadores': evaluadores[id].value, 
            'stock': stock[id].value, 
            'observacion01': observacion01[id].value, 
            'observacion02': observacion02[id].value, 
            'observacion03': observacion03[id].value,
            'esPromo': esPromo[id].checked
        }

        // console.log(id, producto)

        let productoActualizado = await productoService.actualizarProductoService(id,producto)
        // console.log(productoActualizado)

        let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
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