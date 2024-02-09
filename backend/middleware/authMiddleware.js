import usersModel from "../model/usersModel.js";
import  jwt  from "jsonwebtoken";

export let isRequire = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        let decode = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decode;
        console.log('Hi I am decode', decode);
        if (!decode) {
            res.status(200).send({ message: "Unauthorized User" });
        } 
        next();
    } catch (err) {
        console.log(err);
        res.status(200).send({ message: 'User is not authorized' });
    }
};

// For admin

export let isAdmin = async (req, res, next) => {
    let userData = await usersModel.findById({ _id: req.user._id });
    if (userData.role != 0) {
        next();
    } else {
        res.status(200).send({ message: 'User is not authorized' });
    }
};
