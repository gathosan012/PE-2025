import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import UserModel from "../../model/user.model.js"
import userRouter from './route/user.route.js'


const app = express()

app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
//app.use(morgan())


app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user', userRouter)

connectDB().then(()=> {
    app.listen(PORT, ()=> {
        console.log("Server is running", PORT)
    })
})

