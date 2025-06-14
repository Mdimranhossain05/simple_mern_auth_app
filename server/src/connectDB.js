// db.js or in server.js
const mongoose = require('mongoose');
const { dbURL } = require('./secret');


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbURL);
        console.log(`MongoDB connected: ${dbURL}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;