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
    res.send(data);
};

//For updating product
export let updateProductController = async(req,res)=>{
    try {
        let {name,price,quantity,brand,description,category,shipping} = req.body
        let {id} = req.params
        console.log(id);
        if(!name || !price || !quantity || !description || !category || !brand || !shipping)    
        {
            return  res.status(200).send({message:"All fields are required *"})
        } 
        else{
            let findData = await productModel.findOne({ _id: id });
            await deleteImageOnCloudinary(findData.images);
            let image = await uploadImageOnCloudinary(req.files);
            let product = await productModel.findByIdAndUpdate(
              { _id: id },
              { ...req.body,images:image },
              { new: true }
            );
            res.status(200).send({message:'Product updated successfully',success:true,product})
        }
        
    } catch (err) {
        res.status(500).send({message:"Something went wrong while updating",success:false,err})
    }
}
