const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const createError = require('http-errors');
const userRouter = require('./routes/useRoute');
const seedRouter = require('./routes/seedRouter');
const { successReponse, errorRespose } = require('./controllers/responseController');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    return successReponse(res, {statusCode:200, message: "Welcome to the server", payload: {}});
});

app.get("/products", (req, res) => {
    return successReponse(res, {statusCode:200, message: "All Products", payload: {}});
});

//if route was not found this will be invoked
app.use((req, res, next)=>{
    next(createError(404, "Route was not found"));
});

//handle server error
app.use((err, req, res, next)=>{
    console.log("Server Error: " + err.message);
    return errorRespose(res, {statusCode: err.status, message: err.message});
});

module.exports = app