class CarritoService {
    URL_CARRITO = 'https://61b8d2ed38f69a0017ce5d95.mockapi.io/carrito/'

    async guardarCarritoService(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()