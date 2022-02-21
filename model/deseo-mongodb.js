import mongoose from 'mongoose'
import Mongo_DB from './DB_mongo.js'

/* ---------------------------------------------------------------- */
/* Esquema del documento carrito */
const deseoSchema = mongoose.Schema({
    deseo: Array
})


/* Modelo del documento almacenado en una colección */
const DeseoModel = mongoose.model('deseos', deseoSchema)
/* ---------------------------------------------------------------- */

class DeseoModelMongoDB {

    /* CRUD -> C (Create) */
    async createDeseo(deseo) {
        console.log('Estado de la conexión: ',DeseoModelMongoDB.conexionOk)

        // if(!DeseoModelMongoDB.conexionOk) return {}
        if(!Mongo_DB.conexionOk) return {}
        try {
            const deseoSave = new DeseoModel({carrito : carrito})
            await deseoSave.save()
            return carrito
        }
        catch(error) {
            console.log(`Error en createDeseo: ${error.message}`)
            return {}
        }
    }
}

//exports
export default DeseoModelMongoDB