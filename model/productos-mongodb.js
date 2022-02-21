//https://mongoosejs.com/
import mongoose from 'mongoose'
import Mongo_DB from './DB_mongo.js'

/* ---------------------------------------------------------------- */
/* Esquema del documento producto */
const productoSchema = mongoose.Schema({

    imagen: String,
    // imagen: Array, analizar convertir en un array de imágenes y presentar siempre [0]
    nombre: String,
    categoria: String,
    descripcion: String,
    precioLista: Number,
    precioDto: Number,
    evaluacion: Number,
    evaluadores: Number,
    stock: Number,
    observacion01: String,
    observacion02: String,
    observacion03: String,
    esPromo: Boolean,
    HtmlDesc: String,
    TimeStamp: { type : Date, default: Date.now }

})

/* Modelo del documento almacenado en una colección */
const ProductoModel = mongoose.model('productos', productoSchema)
/* ---------------------------------------------------------------- */

class ProductoModelMongoDB {
    
    /* CRUD -> C (Create) */
    async createProducto(producto) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()
            
            let productos = await ProductoModel.find({}).lean()
            let productoGuardado = productos[productos.length-1]

            return Mongo_DB.genIdKey(productoGuardado)
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ONE) */
    async readProducto(id) {
        // console.log(`Leo por Id: ${id}`)

        if(!Mongo_DB.conexionOk) return {}
        try {
            // let producto = await ProductoModel.findOne({_id:id},{categoria:''},{textoBuscado:''}).lean()
            let producto = await ProductoModel.findOne({_id:id}).lean()
            //console.log(producto)
            return Mongo_DB.genIdKey(producto)
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R (Read ALL) */
    async readProductos(async) {
        if(!Mongo_DB.conexionOk) return []
        try {
            let productos = await ProductoModel.find().lean()
            // console.log({...productos})
            //console.log('Paso por acá')
            return Mongo_DB.genIdKey(productos)
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }

    /* CRUD -> RS (Read SOME) */
    async findProductos( categoria) {

        //console.warn(categoria + ' '+claveText )

        if(!Mongo_DB.conexionOk) return []
        try {
            let cateBuscada = categoria

            let productos = await ProductoModel.find(
                {$or: 
                    {categoria:cateBuscada}
                    // ,
                    // {nombre:{'$regex' : '.*' + valorBuscado + '.*'}
                }).lean()
            console.log({...productos})
            return producto //Mongo_DB.genIdKey(productos)
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return []
        }
    }


    /* CRUD -> U (Update) */
    async updateProducto(id,producto) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})
            //console.log(producto)
            let productoActualizado = await ProductoModel.findOne({_id:id}).lean()
            //console.log(productoActualizado)
            return Mongo_DB.genIdKey(productoActualizado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> D (Delete) */
    async deleteProducto(id) {
        if(!Mongo_DB.conexionOk) return {}
        try {
            
            let productoBorrado = await ProductoModel.findOne({_id:id}).lean()
            await ProductoModel.deleteOne({_id:id})
            //console.log(productoBorrado)
            return Mongo_DB.genIdKey(productoBorrado)
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }
}

//exports
export default ProductoModelMongoDB