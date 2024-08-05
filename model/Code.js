// models/Code.js
import mongoose from 'mongoose';


const CodeSchema = new mongoose.Schema({
  html: { type: String, required: false },
  css: { type: String, required: false },
  js: { type: String, required: false },
  output: { type: String, required: true },
  title:{type:String,required:false},


  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  createdAt: { type: Date, default: Date.now },
});

const Code = mongoose.model('Code', CodeSchema);

export default Code;
