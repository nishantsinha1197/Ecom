import express from 'express'
import { loginController, profileUpdateController, registerController , restPasswordHandler} from '../controller/authController.js';
import { isAdmin, isRequire } from '../middleware/authMiddleware.js';
let route=express.Router()
// REGISTER || POST
route.post('/register',registerController)
//LOGIN || POST
route.post('/login',loginController)
//auth-route || GET
route.get('/auth-user',isRequire,(req,res)=>{
    res.send({ok:true})
})
//RESET || POST
route.post('/reset-password',restPasswordHandler)
//admin-auth-route || GET
route.get('/admin-auth-route',isRequire,isAdmin,(req,res)=>{
    res.send({ok:true})
})
//update user || put
route.put('/profile-update',isRequire,profileUpdateController)
export default route;
