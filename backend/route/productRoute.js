import express from 'express'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, filterProductController, getAllProductController, getSingleProductController, productCategoryController, productListController, searchHandlerController, similarProductController, totalProductController, updateProductController } from '../controller/productController.js'
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
//ProductList || GET
route.get('/product-list/:count',productListController)
//similar-product || GET
route.get('/similar-product/:p_id/:c_id',similarProductController)
//search-product || GET
route.get('/search-product/:keyword',searchHandlerController)
//product category || GET
route.get('/product-category/:slug',productCategoryController)
//braintreetoken ||get
route.get('/braintree/token',braintreeTokenController)
// payment
route.post('/braintree/payment',isRequire,braintreePaymentController)