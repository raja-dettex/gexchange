import express from 'express'
import {userRoutes} from './routes/user.router'
const app = express()

app.use(express.json())
app.use('/api/v1/users', userRoutes)

app.listen(4000, ()=> console.log("listening..."))
