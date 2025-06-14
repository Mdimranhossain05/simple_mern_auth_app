const express = require('express');
const data = require('../data');
const userModel = require('../models/userModel');
const createError = require('http-errors');

const seedRouter = express.Router();

seedRouter.get("/user", async (req, res, next) => {
    try{
        await userModel.deleteMany({});

        const users = await userModel.insertMany(data.users);

        return successReponse(res, {statusCode:200, message: "Successfully users inserted", payload: users});
        
    }catch(err){
        next(createError(400, `Error on insertng. Error: `+err.message));
    }
});

module.exports = seedRouter;