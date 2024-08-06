import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js'
import cors from 'cors'
import codeRouter from './routes/codeRoute.js'
const port = 5000;
const app = express();

app.use(express.json());

app.use(cors( )); 

// origin:'http://localhost:3000',credentials:true

mongoose.connect('mongodb+srv://umeshrokamagar68:magar123@cluster0.fvlaut4.mongodb.net/codepen').then((val)=>{
  app.listen(port,()=>{
    console.log('connected server is running ');
  });
})


app.get('/',(req,res)=>{


  return res.status(200).json({
    status:'success',
    message:'welcome to backend'
  })
})




app.use('/api/users',userRouter);

app.use('/api/codes',codeRouter);

