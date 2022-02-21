import ProductoModel from "../model/productos.js"
import config from '../config.js'

const model = ProductoModel.get(config.TIPO_DE_PERSISTENCIA)

/* Api Obtener ALL */
const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

/* Api Obtener ONE */
const obtenerProducto = async id => {
    console.log('paso por api/obtenerProducto')
    let producto = await model.readProducto(id)
    return producto
}

/* Api Obtener Some */
const filtrarProductos  = async (categoria) => {
    console.log('Estoy en la api, categoria: '+categoria)

    let productos = await model.findProductos(categoria)
    return productos
}

/* Api Guardar */
const guardarProducto = async producto => {
    let productoCreado = await model.createProducto(producto)
    return productoCreado
}

/* Api Actualizar */
const actualizarProducto = async (id,producto) => {
    let productoUpdate = await model.updateProducto(id,producto)
    return productoUpdate
}

/* Api Borrar */
const borrarProducto = async id => {
    let productoDelete = await model.deleteProducto(id)
    return productoDelete 
}


//exports
export default {
    obtenerProductos,
    obtenerProducto,
    filtrarProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}