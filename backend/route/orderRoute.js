import express from 'express'
import { isAdmin, isRequire } from '../middleware/authMiddleware.js'
import { allOrderController, updateOrderStatusController, userOrderController } from '../controller/orderController.js'
let route=express.Router()
//order || GET (userOrder)
route.get('/order',isRequire,userOrderController)
export default route
//order || GET (all-order)
route.get('/all-order',isRequire,isAdmin,allOrderController)
//Update status ||PUT
route.put('/update-order/:id',isRequire,isAdmin, updateOrderStatusController)