import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";

//controller for creating the category
export let createCategoryController = async(req,res)=>{
    try{
        let {name} = req.body
        if(!name){
            res.send({message:'Field is required'})
        }
        // let slug = slugify(name);
        // console.log('Generated slug:', slug);
       
        //Checking if category is present in the database
        let result = await  categoryModel.findOne({name:name})
        if(result){
            res.status(200).send({message:'Category already exists',success:false})
        }
        let category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({message:'Category creation successful',category,success:true})
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong while creating the category",success:false})
    }
}
// Controller for fetching all categories
export let allCategoryController = async(req,res) => {
    try{
        let category = await categoryModel.find({}).sort({createdAt:-1})
        res.status(200).send({message:'All Category',success:true, category , total:category.length})
    }
    catch(err){
        res.status(500).send({message:'Something went wrong while fetching all category', success:false,err})
    }

}

//Controller for deleting category
export let deleteCategoryController = async(req,res)=>{
    try{
        let {id}=req.params;
        let result = await categoryModel.findByIdAndDelete({_id:id})
        res.status(200).send({message:'Category deleted successfully',success:true,result})

    }
    catch(err){
        res.status(500).send({message:'Something went wrong while deleting category',success:false,err})
    }
}

//Controller for getting single category
export let singleCategoryController = async(req,res)=>{
    try{
        let {slug} = req.params
        let category = await categoryModel.findOne({slug})
        res.status(200).send({message:'Single category',category,success:true})
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Something went wrong while fetchig single category",success:false,err})
    }
}

//Controller for updating category
export let updateCategoryController=async(req,res)=>{
    try{
        let {id}=req.params;
        let {name}=req.body
        if(!name)
        {
            res.status(200).send({success:false,message:"Field is required*"})
        }
        let category= await categoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
        res.status(200).send({message:"Category Update Successful",category,success:true})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({message:"Somthing wrong while updating category",success:false,err})
    }
    let {id}=req.params
}