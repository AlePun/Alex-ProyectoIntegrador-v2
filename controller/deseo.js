
import api from "../api/deseo.js"

/* Controller POST */
const postDeseo = async (req, res) => {
    let deseo = req.body

    //agregar
    let deseoAgregado = await api.guardarDeseo(deseo)

    let items = []
    for(let item of deseoAgregado) {
        items.push(
            {
                title : item.nombre, 
                unit_price : item.precioDto, 
                quantity : item.cantidad,
            }            
        )
    }
}

//exports
export default {
    postDeseo
}