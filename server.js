import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import user_router from './routes/users.r.js'
dotenv.config()

const app = express()

app.use(cors(
    {
        origin:['http://localhost:5173','https://frontend-9s86.onrender.com'],
        credentials:true
    }
));

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cookieParser())
app.listen(process.env.PORT || 3001,()=>{
    console.log(`Run on ${process.env.PORT || 3001}`);
})

app.use('/users',user_router);