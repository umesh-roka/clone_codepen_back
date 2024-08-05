// routes/codeRoutes.js
import express from 'express'
import {    getallCode, getCodeById, getcodeByUser,  removeCode,  saveCode, updateCode} from '../controller/codeController.js';
import { userCheck } from '../middleware/checkUser.js';

const router = express.Router();


router.route('/').post(userCheck,saveCode);
router.route('/').get(getallCode);
router.route('/usercode').get(userCheck,getcodeByUser)
router.route('/:id').get(getCodeById)
router.route('/:id').patch(userCheck,updateCode).delete(userCheck,removeCode);

export default router;
