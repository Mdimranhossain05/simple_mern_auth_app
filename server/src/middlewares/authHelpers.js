const createHttpError = require("http-errors");
const { decodeJsonWebToken } = require("../jsonWebToken");

const isLoggedIn = (req, res, next) => {
    try {
        //getting token from req
        const accessToken = req.cookies?.accessToken;
        console.log(accessToken);
        if (!accessToken) {
            throw createHttpError(401, "Access token not found. Please login.");
        }

        //decoding token
        const decoded = decodeJsonWebToken(accessToken);
        if (!decoded) {
            throw createError(401, "Invalid access token, Please login.");
        };

        //setting userId in req
        req.user = decoded.user;

        //moving to next middleware
        next();

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const isLoggedOut = (req, res, next) => {
    try {
        //getting token from req
        const accessToken = req.cookies?.accessToken;
        if (accessToken) {
            try {
                const decoded = decodeJsonWebToken(accessToken);
                if (decoded) {
                    throw createHttpError(400, "User should logout first.");
                };
            } catch (error) {
                throw error;
            }
        }

        //moving to next middleware
        next();

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = {isLoggedIn, isLoggedOut}