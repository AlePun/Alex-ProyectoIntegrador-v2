import express from 'express'
import controller from '../controller/deseo.js'

const router = express.Router()

/* Router POST */
router.post('/', controller.postDeseo)

//exports
export default router