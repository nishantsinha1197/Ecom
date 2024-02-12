import express from 'express'
import { loginController, registerController , restPasswordHandler} from '../controller/authController.js';
import { isAdmin, isRequire } from '../middleware/authMiddleware.js';
let route=express.Router()
// REGISTER || POST
route.post('/register',registerController)
//LOGIN || POST
route.post('/login',loginController)
route.get('/auth-user',isRequire,(req,res)=>{
    res.send({ok:true})
})
route.post('/reset-password',restPasswordHandler)
export default route;