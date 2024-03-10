import { encryptPassword, matchPassword } from "../helper/authHelper.js";
import usersModel from "../model/usersModel.js";
import jwt from "jsonwebtoken";
//controller for registration
export let registerController = async (req, res) => {
  let { email, password, name, address, phone, answer } = req.body;
  try {
    if (!email) {
      return res.status(500).send({ message: "email is required *" });
    }
    if (!password) {
      return res.status(500).send({ message: "password is required *" });
    }
    if (!name) {
      return res.status(500).send({ message: "name is required *" });
    }
    if (!address) {
      return res.status(500).send({ message: "address is required *" });
    }
    if (!phone) {
      return res.status(500).send({ message: "phone is required *" });
    }
    if (!answer) {
      return res.status(500).send({ message: "answer is required *" });
    }
    let findUser = await usersModel.findOne({ email: email });
    if (findUser) {
      return res.status(200).send({ message: "User is Already Registered" });
    }
    let hashpassword = await encryptPassword(password);
    let user = await new usersModel({
      name,
      password: hashpassword,
      address,
      phone,
      email,
      answer,
    }).save();

    res
      .status(201)
      .send({ message: "User is registered Successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Somthing wrong while registration",
      err,
      success: false,
    });
  }
};

export let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    // console.log(req.body);
    // res.send('hello')

    //Valiadtion for email and password
    if (!email) {
      res.status(500).send({ message: "Email is required" });
    }
    if (!password) {
      res.status(500).send({ message: "Password is required" });
    }
    let existingUser = await usersModel.findOne({ email: email });
    console.log(existingUser);
    if (!existingUser) {
      return res
        .status(200)
        .send({ message: "Either email or password is invalid" });
    }

    let result = await matchPassword(password, existingUser.password);
    if (!result) {
      return res
        .status(200)
        .send({ message: "Either email or password is invalid" });
    }
    //Token creation when user is logged in successfully
    let token = jwt.sign(
      { _id: existingUser._id },
      process.env.SECRET_KEY
      // { expiresIn: "7d" }
    );
    console.log("token", token);
    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        role: existingUser.role,
        address: existingUser.address,
      },
      token,
    });
  } catch (err) {
    res.status(200).send({
      message: "Something went wrong while trying to log in",
      success: "false",
      err,
    });
  }
};
export let restPasswordHandler = async (req, res) => {
  let { email, password, answer } = req.body;
  if (!email) {
    return res.status(200).send({ message: "Email is required*" });
  }
  if (!password) {
    return res.status(200).send({ message: "Field is required*" });
  }
  let findData = await usersModel.findOne({ email, answer });
  if (!findData) {
    return res
      .status(200)
      .send({ message: "Either email or answer are incorrect *" });
  }
  let hashpassword = await encryptPassword(password);
  let updateData = await usersModel.findByIdAndUpdate(
    { _id: findData._id },
    { password: hashpassword },
    { new: true }
  );
  res
    .status(200)
    .send({ message: "Password Update Successful", success: true });
};
//this is for update user-profile
export let profileUpdateController=async(req,res)=>{
  try{
    let {name,address,phone,password}=req.body
    if(!name || !address || !phone)
    {
      return res.staus(200).send({message:"All fileld required *",success:false})
    }
    else{
      let findData=await usersModel.find({_id:req.user._id})
      if(findData)
      {
        let newPassword=password ? await  encryptPassword(password) :findData.password;
        let updateData= await usersModel.findByIdAndUpdate({_id:req.user._id},{...req.body,password:newPassword},{new:true})
        res.status(200).send({message:"Profile is Updated successful",success:true,user:updateData})
      }
      else{
        return res.status(500).send({success:false,message:"somthing wrong"})
      }
    }
  }
  catch(err)
  {
    console.log(err)
    res.status(500).send({message:"Somthing wrong while updating",err,success:false})
  }
}