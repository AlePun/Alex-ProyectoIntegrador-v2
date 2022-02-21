class ProductoService {
    // URL_PRODUCTOS = 'https://61b8d2ed38f69a0017ce5d95.mockapi.io/productos/'
    URL_PRODUCTOS = '/api/productos/'
    URL_PRODUCTOSExtra = '/api/productosExtra/'

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS)
        return productos
    }
    
    async filtrarProductosService(categoria, textoFiltrado) {

        // console.log(this.URL_PRODUCTOS, ' ', categoria, ' ', textoFiltrado)
        // let productos = await http.buscar(this.URL_PRODUCTOS, categoria, textoFiltrado)
        let productos = await http.buscar(this.URL_PRODUCTOSExtra, categoria)
        console.log(productos)
        return productos
    }

    async guardarProductoService(producto) {
        let productoGuardado = await http.post(this.URL_PRODUCTOS, producto)
        return productoGuardado
    }

    async actualizarProductoService(id,producto) {
        let productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    }

    async borrarProductoService(id) {
        let productoBorrado = await http.del(this.URL_PRODUCTOS, id)
        return productoBorrado
    }
}

const productoService = new ProductoService()