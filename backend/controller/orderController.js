import orderModel from "../model/orderModel.js"

//This is for handling order for specific user
export let userOrderController=async (req,res)=>{
    try{
        let orders=await orderModel.find({buyer:req.user._id}).populate('products').populate('buyer',"name").sort({createdAt:-1})
        res.status(200).send({message:"All Orders",orders,success:true})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({message:"somthing wrong while printing order",err,success:false})
    }
}
//This is for handling all orders for admin
export let allOrderController = async(req,res)=>{
    try {
        let orders = await orderModel.find({}).populate('products').populate('buyer',"name").sort({createdAt:-1})
        res.status(200).send({message:"All orders fetched successfully",orders,success:true})
    } catch (err) {
        res.status(500).send({message:'Something went wrong while getting all order',success:false,err})
        
    }
}
//This is for updating order status by admin
export let updateOrderStatusController=async(req,res)=>{
    try{
        let {id}=req.params
        let {status}=req.body
        let updateData=await orderModel.findByIdAndUpdate({_id:id},{status},{new:true})
        res.status(200).send({message:"Update Successful",updateData,success:true})
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"Somthing wrong while updating",err,success:false})
    }

}