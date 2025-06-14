require('dotenv').config();

data = {};

data.serverPort = process.env.SERVER_PORT || 3001;
data.dbURL = process.env.MONGODB_URL
data.jwtSecretKey = process.env.JW_ACTIVATION_KEY || "ABCD";

module.exports = data