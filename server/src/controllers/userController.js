const createError = require("http-errors");
const userModel = require("../models/userModel");
const { successReponse } = require("./responseController");
const { createJsonWebToken } = require("../jsonWebToken");
const { setAccessToken } = require("../cookie");


const getUsers = async (req, res, next) => {
    try {

        const users = await userModel.find({});

        return successReponse(res, {statusCode:200, message: "Successfully got the users", payload: users});

    }catch(err){
        next(createError(400, "Could not not get users"));
    }
}

const getProfile = (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "User profile returned"
    })
}

const getUserByID = async(req, res, next) => {
    try{
        const id = req.params.id;
        const user = await userModel.findById(id, {password: 0});
        if(!user){
            throw createError(404, "User was not found");
        }

        return successReponse(res, {statusCode:200, message: "User returned successfully", payload:user});

    }catch(err){
        next(err);
    }
}

const deleteUserByID = async(req, res, next) => {
    try{
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            throw createError(404, "User was not found");
        }

        return successReponse(res, {statusCode:200, message: "User deleted successfully", payload:user});

    }catch(err){
        next(err);
    }
}

const registerUser = async (req, res, next)=>{
    try{    

        const {name, email, password, phone, address} = req.body;
        const newUser = {name, email, password, phone, address};
        const user = await userModel.insertOne(newUser);
        const token = createJsonWebToken({email: newUser.email});
        setAccessToken(res, token);

        return successReponse(res, {statusCode:200, message: "User registered successfully", payload:user});

    }catch(err){
        next(err)
    }
}


module.exports = { getUsers, getProfile, getUserByID, deleteUserByID, registerUser};