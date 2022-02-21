import ProductoModel from "../model/productos.js"
import config from '../config.js'

const model = ProductoModel.get(config.TIPO_DE_PERSISTENCIA)

/* Api Obtener Some */
const filtrarProductos  = async (categoria) => {
    console.log('Estoy en la api, categoria: '+categoria)

    let productos = await model.findProductos(categoria)
    return productos
}


//exports
export default {
    filtrarProductos
}