const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('./secret');

const createJsonWebToken = (payload)=>{
    const token = jwt.sign(payload, jwtSecretKey);
    return token;
}

const decodeJsonWebToken = (token,) => {
    try {

        let decodedToken;
        jwt.verify(token, jwtSecretKey, (err, decoded) => {
            if (err) {
                    throw createError(err.status, err.message);
            }
            else {
                decodedToken = decoded;
            }
        });
        return decodedToken;
    } catch (error) {
        console.log("Failed to decode token: ", error.message);
        throw error;
    }
}

module.exports = {createJsonWebToken, decodeJsonWebToken}