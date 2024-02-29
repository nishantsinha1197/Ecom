import {deleteImageOnCloudinary, uploadImageOnCloudinary} from '../helper/cloudinaryHelper.js'
import productModel from '../model/productModel.js'
// import cloudinary from '../config/cloudinary'

//This is for creating product
export let createProductController = async (req, res) => {
    try{
        let {name,price,quantity,description,category,brand,shipping}=req.body
        let images=req.files
        if(!name || !price || !quantity || !description || !category || !brand || !shipping)    
        {
            return  res.status(200).send({message:"All fields are required *"})
        } 
        if(images.length==0)
        {
            return res.status(200).send({message:"At least Upload one image"}) 
        }
        let image= await uploadImageOnCloudinary(req.files)
        console.log(category);
        let product = await new productModel({name,price,quantity,description,category,brand,shipping,images:image}).save()
        res.status(201).send({message:"Product Created Successful",success:true,product})
  }
  catch(err)
  {
      console.log(err)
      res.status(500).send({message:"Somthing wrong while creating product",success:false,err})
  }
}

//This is for fetching all products
export let getAllProductController= async(req,res)=>{
    try{
        let products = await productModel.find({}).populate('category').sort({createdAt:-1})
        res.status(200).send({message:"All prducts fetched",success:true,products,total:products.length})
    }
    catch(err){
        res.status(500).send({message:'Something went wrong while fetching product'})
    }
}
//For getting data of a single product
export let getSingleProductController= async(req,res)=>{
    try{
        let {id} = req.params
        let product = await productModel.findOne({ _id: id });
        res.status(200).send({message:'Single product fetched',product,success:true})
    }
    catch(err){
        res.status(500).send({message:'Something went wrong while fetching single product',success:false,err})
    }
}
//For deleting product
export let deleteProductController = async (req, res) => {
    let { id } = req.params;
    let data = await productModel.findOne({ _id: id });
    //console.log(data);
    //do cleanup in cloudinary
    await deleteImageOnCloudinary(data.images);
    let deleteProduct = await productModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      message: "Product Deleted Successfully",
      success: true,
      deleteProduct,
    });
    // res.send(data);
};

//For updating product
export let updateProductController = async(req,res)=>{
    try {
        let {name,price,quantity,brand,description,category,shipping} = req.body
        let {id} = req.params
        if(!name || !price || !quantity || !description || !category || !brand || !shipping)    
        {
            return  res.status(200).send({message:"All fields are required *"})
        } 
        else{
            let findData = await productModel.findOne({ _id: id })
            let image
            if(req.files.length>0){
                await deleteImageOnCloudinary(findData.images);
                image= await uploadImageOnCloudinary(req.files)
            }
            let product = await productModel.findByIdAndUpdate(
              { _id: id },
              { ...req.body,images:image?image:findData.images },
              { new: true }
            );
            res.status(200).send({message:'Product updated successfully',success:true,product})
        }     
    } catch (err) {
        res.status(500).send({message:"Something went wrong while updating",success:false,err})
    }
}
//Filter product controller
export let filterProductController=async(req,res)=>{
    console.log(req.body)
    try{
          let {price,checked}=req.body
          let args={}
          if(checked.length>0) args.category=checked
          if(price) args.price={$gte:price[0],$lte:price[1]}
          const products=await productModel.find(args)
          res.status(200).send({message:"All Filter Data",products,success:true})  
    }
    catch(err)
    {
      console.log(err)
      res.status(500).send({message:"Somthing wrong while filtering",success:false,err})
    }
    let {price,category}=req.body
}
//this is for the finding total product 
export let totalProductController=async(req,res)=>{
    try{
      let productCount=await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({message:"Total Count",total:productCount,success:true})
    }
    catch(err)
    {
      console.log(err)
      res.status(500).send({message:"Somthing wrong while finding total Length",success:false ,err})
    }
}
//ProductList Controller
export let productListController = async(req,res)=> {
    try{
        let {count}=req.params
        console.log('dev test',count);
        const page = count ?req.params.count:1
        let perPageContent=3
        let products = await productModel.find({}).skip((page-1)*perPageContent).limit(perPageContent)
        res.status(200).send({message:'Products result',products,success:true})
    }
    catch (err){
        console.log(err);
        res.status(500).send({message:'Something went wrong while loading',success:false,err})
    }
}