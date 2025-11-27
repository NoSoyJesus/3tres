import { Router } from "express"
import { registro, iniciarSesion, protegido } from "../controllers/users.controller.js"
import { verificarUsuario } from "../middlewares/verificarUsuario.js"
const router = Router()

router.post('/register', registro)
router.post('/iniciarSesion', iniciarSesion)
router.get('/protegido', verificarUsuario, protegido)

export default router