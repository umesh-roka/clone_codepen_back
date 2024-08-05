// controllers/codeController.js
import mongoose from 'mongoose';
import Code from '../model/Code.js'



export const saveCode = async (req, res) => {
  const { html, css, js,output,title } = req.body;

  try {
    const code = new Code({ html, css, js,output,title, user: req.userId});
    await code.save();
    res.status(201).json({statu:'success',message:'added successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to save code' });
  }
};






export const updateCode = async (req, res) => {
  const {id} = req.params;
  
  const { html, css, js,output,title } = req.body;

  try {
    await Code.findByIdAndUpdate(id,{html,css,js,output,title});
    res.status(200).json({statu:'success',message:'updated successfully'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to save code' });
  }
};




export const getcodeByUser = async (req, res) => {
  try {
   

    // Extract and remove query parameters for custom handling
    const objFields = [ 'page', 'limit'];
    const queryObject = { ...req.query };
    objFields.forEach((ele) => delete queryObject[ele]);

    // Query for fetching codes by user
    queryObject.user = req.userId;
    let query = Code.find(queryObject).populate('user', 'username');

 
    // Handle pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute the query
    const codes = await query;
    const total = await Code.countDocuments();

    if (!codes.length) {
      return res.status(404).json({ message: 'Code not found', userId: req.userId });
    }

    // Extract the username from the first code (assuming the same user for all codes)
    const username = codes[0].user.username;

    res.status(200).json({ status: 'success', total, length:codes.length, data:codes, username });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch codes', details: err.message });
  }
};


export const getCodeById = async(req,res)=>{
const {id} = req.params;

try {
  if(mongoose.isValidObjectId(id)){
    const code = await Code.findById(id);
    return res.status(200).json({
      status:'success',
      data:code
    })
  }
  else{
    return res.status(400).json({
      stauts:'error',
      message:'code not found'
    })
  }
} catch (err) {
  return res.status(400).json({
    stauts:'error',
    message:`${err}`
  })
}

}


export const getallCode = async(req,res)=>{
  try {
    const objectField = ['page','limit'];
    const queryObject ={...req.query};
    objectField.forEach((ele)=> delete queryObject[ele]);

    let query = Code.find(queryObject);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page-1)*limit;
    query = query.skip(skip).limit(limit);

    const codes = await query;
    const total = await Code.countDocuments();

    return   res.status(200).json({
      status:'success',
      total, length:codes.length , data:codes
    });


  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch codes', details: err.message });
  }

}


export const removeCode = async(req,res)=>{
const {id} = req.params;
try {
  await Code.findByIdAndDelete(id);
  return res.status(200).json({
    status:'success',
    message:'code removed'
  });
} catch (err) {
  return res.status(400).json({
    status:'error',
    message:`${err}`
  });
}


}