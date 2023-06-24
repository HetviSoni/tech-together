const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");
const errorHandler = require("./middleware/errormiddleware");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Middleware
app.use("/api/users", userRouter);


//Routes
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    })
}).catch(err => {
    console.log(err);
})