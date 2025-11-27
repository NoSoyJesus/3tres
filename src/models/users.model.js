import pool from '../../config/conexiondb.js'

export const crearUsuario = async (nombre, email, password) => {
    const query = "INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, 0)"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [nombre, email, password])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}

export const obtenerUsuario = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?"
    try {
        const conexion = await pool.getConnection()
        const [respuesta] = await conexion.query(query, [email])
        conexion.release()
        return respuesta
    } catch (error) {
        return error
    }
}