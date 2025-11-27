import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function verificarUsuario(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(403).send("No autorizado!")
    
    try {
        const data = jwt.verify(token, process.env.SECRETO_JWT)
        req.usuario = data;
        next()
    } catch (error) {
        return res.status(401).send("Token invalido");
    }
}