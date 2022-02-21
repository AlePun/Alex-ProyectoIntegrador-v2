


obtenerProductoDeDeseo(producto) {
    return this.deseo.find(prod => prod.id == producto.id)
}

elProductoEstaEnElDeseo(producto) {
    return this.deseo.filter(prod => prod.id == producto.id).length
}

// por cada producto en deseo, los recorro y adiciono en el carrito
agregarAlCarrito(producto) {
    if(!this.elProductoEstaEnElCarrito(producto)) {
        producto.cantidad = 1
        this.carrito.push(producto)
    }
    else {
        let productoDeCarroto = this.obtenerProductoDeCarrito(producto)
        productoDeCarrito.cantidad++
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
}