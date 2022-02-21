//https://mongoosejs.com/
import mongoose from 'mongoose'
import Mongo_DB from './DB_mongo.js'
//import CarritoModelMongoDB from './carrito-mongodb.js'


/* ---------------------------------------------------------------- */
/* Esquema del documento carrito */
const carritoSchema = mongoose.Schema({
    carrito: Array
})


/* Modelo del documento almacenado en una colección */
const CarritoModel = mongoose.model('carritos', carritoSchema)
/* ---------------------------------------------------------------- */

class CarritoModelMongoDB {

    /* CRUD -> C (Create) */
    async createCarrito(carrito) {
        console.log('Estado de la conexión: ',CarritoModelMongoDB.conexionOk)

        // if(!CarritoModelMongoDB.conexionOk) return {}
        if(!Mongo_DB.conexionOk) return {}
        try {
            const carritoSave = new CarritoModel({carrito : carrito})
            await carritoSave.save()
                    console.log('paso por Model-CarritoMongo DB')
            return carrito
        }
        catch(error) {
            console.log(`Error en createCarrito: ${error.message}`)
            return {}
        }
    }
}

//exports
export default CarritoModelMongoDB