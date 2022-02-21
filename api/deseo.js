import DeseoModel from "../model/deseo.js"
import config from '../config.js'

const model = DeseoModel.get(config.TIPO_DE_PERSISTENCIA)

/* Api Guardar */
const guardarDeseo = async carrito => {
    let deseoCreado = await model.createDeseo(deseo)
    
    console.log('deseoCreado: ', deseoCreado)
    return deseoCreado
}

//exports
export default {
    guardarDeseo
}