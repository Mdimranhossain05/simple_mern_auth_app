const express = require('express');
const userModel = require('../models/userModel');
const createHttpError = require('http-errors');
const { createJsonWebToken } = require('../jsonWebToken');
const { setAccessToken } = require('../cookie');
const bcrypt = require('bcrypt');
const { successReponse } = require('../controllers/responseController');
const { isLoggedOut, isLoggedIn } = require('../middlewares/authHelpers');

const authRouter = express.Router();

authRouter.post("/login", isLoggedOut ,async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).lean();
        if (!user) {
            throw createHttpError(404, "Email is not registered. Please register first.");
        }

        //checking if the password is correct for the email user
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw createHttpError(400, "Email and Password did not match");
        }

        const accessToken = createJsonWebToken({email: user.email});
        setAccessToken(res, accessToken);

        return successReponse(res, {statusCode:200, message: "Login success", payload:user});
    } catch (err) {
        next(err);
    }
});

authRouter.post('/logout', isLoggedIn, (req, res, next) => {
    try{
        res.clearCookie('accessToken');
        return successReponse(res, {statusCode:200, message: "Logout success"});
    }catch(err){
        next(err);
    }
})

module.exports = authRouter;