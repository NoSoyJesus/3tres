
import { Router } from 'express'
import { listarProductos, obtenerProducto, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/products.controller.js'

const router = Router()

router.get('/', listarProductos)
router.get('/:id', obtenerProducto)
router.post('/', crearProducto)
router.put('/:id', actualizarProducto)
router.delete('/:id', eliminarProducto)

export default router
