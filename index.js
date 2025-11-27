import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";   
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(cors())
app.use(cookieParser())

import usersRouter from './src/routes/users.routes.js'
app.use('/users', usersRouter)
import productsRouter from './src/routes/products.routes.js'
app.use('/productos', productsRouter)

app.use((req, res) => {
    res.status(404).send('La ruta no existe.')
})

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))