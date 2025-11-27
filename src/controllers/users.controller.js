import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as model from "../models/users.model.js"
import { configDotenv } from "dotenv"
configDotenv()

export const registro = async (req, res) => {
    const {Nombre, Email, Password} = req.body
    if (!Email || !Password || !Nombre) {
        return res.status(422).json({ message: "Campos incompletos." })
    }

    const hash = await bcrypt.hash(Password, 10)
    try {
        const respuesta = await model.crearUsuario(Nombre, Email, hash)
        if (respuesta.errno) {
            return res.status(500).json({ message: `Error en consulta ${respuesta.errno}` })
        }
        res.status(201).json({ message: `Nuevo Usuario Creado: ${Nombre}` })
    } catch (error) {
        return res.status(500).json({ message: 'Error al momento de registrar.' })        
    }
}

export const iniciarSesion = async (req, res) => {
    const {Email, Password} = req.body
    if (!Email || !Password) {
        return res.status(422).json({ message: "Campos incompletos." })
    }    
    const usuario = await model.obtenerUsuario(Email)

    if (!usuario || usuario.length === 0) { 
        return res.status(401).json({ message: "Credenciales invalidas" }) 
    }

    const compararPassword = await bcrypt.compare(Password, usuario[0].password)
    if (!compararPassword) {
        return res.status(401).json({ message: "Credenciales invalidas" }) 
    }

    const token = jwt.sign(
        {nombre: usuario[0].nombre, password: usuario[0].password ,rol: usuario[0].rol},
        process.env.SECRETO_JWT,
        { expiresIn: '12h' }
    )

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 43200000 
    })

    const nombreUsuario = usuario[0].nombre
    const rol = usuario[0].rol

    res.status(200).json({message: "Inicio de sesion satisfactorio!", token, nombreUsuario, rol})    
}


export const protegido = async (req, res) => {
    const { rol } = req.usuario
    if ( rol == 1 ) {
        return res.status(201).json({message: 'Administrador'})
    }

    res.status(202).json({ message: "Usuario en sesion" })
}