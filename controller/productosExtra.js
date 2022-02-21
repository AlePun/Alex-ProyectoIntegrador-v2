import api from "../api/productos.js"



const findProductos = async (req,res) => {

    console.log( 'find productos -- estos son los params que llegan ',req.params)
    let cate= req.params.categoria
    
    if (!cate=='') {
        console.log('Entro por Cate', cate)
        let productos = await api.filtrarProductos(cate)
        res.json(productos)
    } else {
        console.log('Entro en la masiva de findProductos')
        let productos = await api.obtenerProductos()
        res.json(productos)
    }
}

//exports
export default {
    findProductos
}