const express = require('express');
const { getUsers, getProfile, getUserByID, deleteUserByID, registerUser } = require('../controllers/userController');
const { isLoggedOut } = require('../middlewares/authHelpers');

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserByID);
userRouter.delete("/:id", deleteUserByID);
userRouter.get("/profile", getProfile);
userRouter.post("/register",isLoggedOut ,registerUser);

module.exports = userRouter;