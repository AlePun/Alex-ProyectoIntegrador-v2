import DeseoModelMongoDB from "./deseo-mongodb.js";

class deseoModel {
    static get(tipo) {
        switch(tipo) {
            case 'MONGODB':
                console.log('**** PERSISTENCIA MONGODB (deseo) ****')
                return new DeseoModelMongoDB()

            default:
                console.log('**** PERSISTENCIA DEFAULT (deseo) ****')
                return new DeseoModelMongoDB()
        }
    }
}

export default deseoModel