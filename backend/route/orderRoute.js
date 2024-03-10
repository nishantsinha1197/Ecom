import express from 'express'
import { isRequire } from '../middleware/authMiddleware.js'
import { userOrderController } from '../controller/orderController.js'
let route=express.Router()
//order || get (userOrder)
route.get('/order',isRequire,userOrderController)
export default route