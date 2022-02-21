import api from "../api/productos.js"


/* Controller GET */
const getProductos = async (req,res) => {

    console.log( 'estos son los params que llegan ',req.params)
    let id = req.params.id

    if(!id=='') {
        console.log('Entro por ID')
        let producto = await api.obtenerProducto(id)
        res.json(producto)
    } else {
        let productos = await api.obtenerProductos()
        res.json(productos)
    }
}



/* Controller POST */
const postProducto = async (req,res) => {
    let producto = req.body
    //agregar
    let productoAgregado = await api.guardarProducto(producto)

    res.json(productoAgregado)
}

/* Controller PUT */
const putProducto = async (req,res) => {
    let id = req.params.id
    let producto = req.body
    //actualizar
    let productoActualizado = await api.actualizarProducto(id,producto)
    console.log('Pasé por putProductos,con el id: ', id)
    console.log('Pasé por putProductos,con el producto: ', producto)

    res.json(productoActualizado)
}

/* Controller DELETE */
const deleteProducto = async (req,res) => {
    let id = req.params.id
    //borrar
    let productoBorrado = await api.borrarProducto(id)

    res.json(productoBorrado)
}

//exports
export default {
    getProductos, // es igual a -> getProductos : getProductos,
    // findProductos, 
    postProducto,
    putProducto,
    deleteProducto
}