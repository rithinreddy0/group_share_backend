const express = require("express");

const cors = require('cors');

const app = express();
app.use(cors());
const dbconnect = require("./config/dbConnect")
require("dotenv").config();
const firebase  = require("./config/firebase")
const router = require("./routes");
const parser = require("body-parser");
const fileupload = require("express-fileupload");
app.use(fileupload({
useTempFiles : true,
tempFileDir : '/tmp/'
}));
app.use(parser.json());
dbconnect();
const PORT = process.env.PORT || 4000;

firebase();
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})
app.use("/api",router);

app.get("/",(req,res)=>{
    res.send("hello");
})