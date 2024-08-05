import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export const userLogin = async(req,res)=>{
const{email,password} = req.body;
try {
  const isExist = await User.findOne({email:email})
  if(isExist){
const passMatch = bcrypt.compareSync(password,isExist.password);
if(!passMatch){
  return res.status(400).json({
    status:'error',
    message:'invalid credential'
  })

}
else{
const token = jwt.sign({userId:isExist._id,isAdmin:isExist.isAdmin},'toky');

res.cookie('jwt', token, {
  secure:false,
  httpOnly:true,
  samesite:'none',
  maxAge:1*24*60*60*1000,
})

return res.status(200).json({
  token,
  id:isExist._id,
  email:isExist.email,
  isAdmin:isExist.isAdmin,
  username:isExist.username
});
}
    
  }
  else{
return res.status(400).json({
  status:'error',
  message:'invalid user'
})
  }
  
} catch (err) {
  return res.status(400).json(`${err}`);
}

}




export const userSignup = async (req,res)=>{
  const {username,password,email} = req.body;

  try {
    const isExist = await User.findOne({email:email});
    if(isExist){
return res.status(400).json({
  statues:'error',
  message:'user already esixt'
})
    }
    else{
const haspass = bcrypt.hashSync(password,10);

await User.create({
  username,
  email,
  password:haspass
})
return res.status(201).json({
  status:'success',
  message:'successfully added'
})

    }
  } catch (err) {
    return res.status(400).json(`${err}`);
  }
}


