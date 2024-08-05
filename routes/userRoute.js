import express from 'express'
import {  userLogin, userSignup } from '../controller/userController.js';

const router = express.Router();


router.route('/signup').post(userSignup);
router.route('/login').post(userLogin);

export default router;