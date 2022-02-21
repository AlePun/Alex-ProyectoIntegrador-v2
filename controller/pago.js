// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-2834419942304109-020804-3f78d687242e2035c319c3237be05374-150035893",// Prueba
});

// console.log('------ Sistema de pago iniciado -------')

const feedback = (req, res) => {
	let info = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	}
    console.log(info)

    res.redirect('/')
}

export default {
    feedback
}