import express from 'express'
import { isRequire } from '../middleware/authMiddleware.js'
import { userOrderController } from '../controller/orderController.js'
let route=express.Router()
//order || get (userOrder)
//testing
route.get('/order',isRequire,userOrderController)
export default route