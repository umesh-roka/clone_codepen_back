import jwt from 'jsonwebtoken'




export const userCheck = (req,res,next)=>{
  const token = req.headers?.authorization;
  try {
    const decode = jwt.decode(token,'toky');
    if(decode){
      const {userId,isAdmin} = decode;
      req.userId = userId;
      req.isAdmin = isAdmin;
    }

    next();
  } catch (error) {
    
  }
}