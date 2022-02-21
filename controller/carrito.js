import mercadopago from "mercadopago"
import api from "../api/carrito.js"

/* Controller POST */
const postCarrito = async (req, res) => {
    let carrito = req.body
    // console.log('Este es el carrito, tal y como llega: ',carrito) // entero - OK

    //agregar
    let carritoAgregado = await api.guardarCarrito(carrito)

    console.log('Detalle del carrito agregado', carritoAgregado) // Vacio - No ok

    let items = []
    for(let item of carritoAgregado) {
        items.push(
            {
                picture_url: item.imagen, 
                title : item.nombre, 
                category_id: item.categoria, 
                descripcion: item.descripcion, 
                currency_id: 'ARS',
                unit_price : item.precioDto, 
                quantity : item.cantidad
            }            
        )
    }

    // Crea un objeto de preferencia
    let preference = {
        items : items,
		back_urls: {
			"success": "http://localhost:8080/api/carrito/feedback",
			"failure": "http://localhost:8080/api/carrito/feedback",
			"pending": "http://localhost:8080/api/carrito/feedback"
		},
		auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
            res.json({id: response.body.id, items})
        })
        .catch(function (error) {
            console.log(error);
        });
}

//exports
export default {
    postCarrito
}