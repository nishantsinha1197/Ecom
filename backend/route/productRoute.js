import express from 'express'
import { createProductController, deleteProductController, filterProductController, getAllProductController, getSingleProductController, totalProductController, updateProductController } from '../controller/productController.js'
import uploads from '../config/multer.js'
import { isAdmin, isRequire } from '../middleware/authMiddleware.js'
let route = express.Router()

//create-product || POST
route.post('/create-product',isRequire,isAdmin,uploads.array('images',4),createProductController)
export default route
//get-product || GET
route.get('/products',getAllProductController)
//single-product || GET
route.get('/single-product/:id', getSingleProductController)
//delete-product || DELETE
route.delete('/delete-product/:id',isRequire,isAdmin,deleteProductController)
//update-product || PUT
route.put('/update-product/:id',isRequire,isAdmin,uploads.array('images',4),updateProductController)
//filter-product || POST
route.post('/filter-product',filterProductController)
//totalProductCount || GET
route.get('/totalProduct',totalProductController)