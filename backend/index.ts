import express from "express";
import {createClient} from "redis"
import authRouter from './routes/authRouter'
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(express.json()) //for POST
const client = await createClient({
    url:process.env.REDIS_URL
}).on("error", (e)=>console.log("error:" , e)) //"error" is a builtin eventName
  .connect()

app.use(authRouter)

app.listen(3000)