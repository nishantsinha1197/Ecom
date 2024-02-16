import express from 'express'
import { createProductController, getAllProductController } from '../controller/productController.js'
import uploads from '../config/multer.js'
import { isAdmin, isRequire } from '../middleware/authMiddleware.js'
let route = express.Router()

//create-product || POST
route.post('/create-product',isRequire,isAdmin,uploads.array('images',4),createProductController)
export default route
//get-product || GET
route.get('/products',getAllProductController)