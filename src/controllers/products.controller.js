import * as model from '../models/products.model.js'

export const listarProductos = async (req, res) => {
    try {
        const productos = await model.obtenerProductos()
        return res.status(200).json(productos)
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener productos.' })
    }
}

export const obtenerProducto = async (req, res) => {
    const { id } = req.params
    try {
        const producto = await model.obtenerProductoPorId(id)
        if (!producto || producto.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' })
        }
        return res.status(200).json(producto[0])
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto.' })
    }
}

export const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio } = req.body
    if (!nombre || descripcion === undefined || precio === undefined) {
        return res.status(422).json({ message: 'Campos incompletos.' })
    }

    try {
        const respuesta = await model.crearProducto(nombre, descripcion, precio)
        if (respuesta && respuesta.insertId) {
            return res.status(201).json({ message: 'Producto creado.', id: respuesta.insertId })
        }
        return res.status(201).json({ message: 'Producto creado.' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el producto.' })
    }
}

export const actualizarProducto = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, precio } = req.body
    if (!nombre || descripcion === undefined || precio === undefined) {
        return res.status(422).json({ message: 'Campos incompletos.' })
    }

    try {
        const respuesta = await model.actualizarProducto(id, nombre, descripcion, precio)
        if (respuesta && respuesta.affectedRows && respuesta.affectedRows > 0) {
            return res.status(200).json({ message: 'Producto actualizado.' })
        }
        return res.status(404).json({ message: 'Producto no encontrado.' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto.' })
    }
}

export const eliminarProducto = async (req, res) => {
    const { id } = req.params
    try {
        const respuesta = await model.eliminarProducto(id)
        if (respuesta && respuesta.affectedRows && respuesta.affectedRows > 0) {
            return res.status(200).json({ message: 'Producto eliminado.' })
        }
        return res.status(404).json({ message: 'Producto no encontrado.' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto.' })
    }
}
