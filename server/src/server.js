const app = require("./app");
const connectDB = require("./connectDB");
const { serverPort } = require("./secret");


app.listen(serverPort, async(error) => {
    if (!error) {
        console.log("Server running at http://localhost:"+serverPort);
        await connectDB();
    }
    else{
        console.log("Server was not started successfully");
    }
});