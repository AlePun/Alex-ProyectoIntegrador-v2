import express from 'express'
import controller from '../controller/productosExtra.js'

const router = express.Router()

/* Router GET */
console.log('Paso por el router Producto Extra')
router.get('/:categoria?', controller.findProductos)

//exports
export default router