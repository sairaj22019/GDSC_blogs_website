import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { User } from './models/User.model.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { uploadMiddleWare } from './middlewares/Multer.middleware.js';
import fs from 'fs'
import { Post } from './models/Post.model.js';
dotenv.config();
const app = express()
app.use(cors({credentials:true,origin:process.env.CORS_ORIGIN}))
app.use(express.json())
app.use(cookieParser())


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    app.listen(4000, () => {
      console.log("Server started successfully");
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();


app.post('/register' , async (req,res)=>{
    const {username , password} = req.body
    if (!username || !password) {
  return res.status(450).json("Username and password are required");
}
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(503).json({ error: 'Username already exists' });
    }
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const UserDoc = await User.create({
        username,
        password:hashedPassword,
        })
    res.json(UserDoc)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
})

app.post('/login' , async (req,res)=>{
    const {username , password} = req.body
    const userDoc = await User.findOne({username})
    if(!userDoc){
        return res.status(401).json("username does not exist")
    }
    const checkPass = bcrypt.compareSync(password , userDoc.password)
    if(checkPass){
        const token = jwt.sign({username,id:userDoc._id}, process.env.JWT_SECRET, { expiresIn: '7d' },(err,token)=>{
            if (err) return res.status(500).json("Token generation failed");
            res.cookie('token',token).json({
                id:userDoc._id,
                username
            })
        });
    }else{
        res.status(400).json("Incorrect credentials")
    }
    
})


app.get('/profile' , (req,res)=>{
    const {token} = req.cookies
    jwt.verify(token,process.env.JWT_SECRET,{},(err,info)=>{
        if(err) throw err
        res.json(info)
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('logged out succesfully')
})

app.post('/post',uploadMiddleWare.single('file') ,async (req,res)=>{
    const {originalname,path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path+'.'+ext
    fs.renameSync(path , newPath)

    const {token} = req.cookies
    jwt.verify(token,process.env.JWT_SECRET,{},async (err,info)=>{
        if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
        const {title , summary , content} = req.body
        try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        // author: info.id,
      });

      res.json(postDoc);
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: err });
    }
    })

    
})


app.get('/post' , async (req,res)=>{
    res.json( await Post.find())
})



