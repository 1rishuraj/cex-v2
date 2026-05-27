import {Router} from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {authSchema} from '../types/authSchema'
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const router =Router()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
});

router.get("/",authMiddleware,(req,res)=>{
    res.send("token ok")
})

router.post('/signup',async (req,res)=>{
    const data = req.body;
    const response = authSchema.safeParse(data)
    if (!response.success){
        res.status(409).send(response.data)
    }else{
        console.log("hi")
        const {username, password} = req.body;
        const validID=await prisma.auth.findFirst({
            where : {username:username}
        })
        if(validID){
            res.status(409).send("Username already exists")
        }else{
            const hashed = await bcrypt.hash(password, 10)
            await prisma.auth.create({
                data: {username:username, password:hashed}
            })
            res.status(201).send("Signup Successfull!")
        }

    }
})

router.post('/signin',async(req,res)=>{
    const data = req.body;
    const response = authSchema.safeParse(data)
    if (!response.success){
        res.send(response.data)
    }else{
        const {username, password} = req.body;
        const validID=await prisma.auth.findFirst({
            where : {username:username}
        })
        if(!validID){
            res.status(409).send("Signup first!")
        }else{
            const isPassed = await bcrypt.compare(password, validID.password)
            if(!isPassed){
                res.status(409).send("Incorrect password!")
            }
            const secret=process.env.JWT_SECRET||"ok"
            const sign=jwt.sign(validID.id,secret)
            res.status(201).json({
                token:sign,
                msg:"Signin Successfull"
            })
        }

    }
})
export default router