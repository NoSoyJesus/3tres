import pool from '../../config/conexiondb.js'

export const obtenerProductos = async () => {
    const query = "SELECT * FROM productos"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query)
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}

export const obtenerProductoPorId = async (id) => {
    const query = "SELECT * FROM productos WHERE id = ?"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [id])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}

export const crearProducto = async (nombre, descripcion, precio) => {
    const query = "INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [nombre, descripcion, precio])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}

export const actualizarProducto = async (id, nombre, descripcion, precio) => {
    const query = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [nombre, descripcion, precio, id])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}

export const eliminarProducto = async (id) => {
    const query = "DELETE FROM productos WHERE id = ?"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [id])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}
