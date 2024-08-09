const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(console.log("DB Connected sucessfully"))
    .catch(err=>console.log(err))
}
module.exports= dbConnect;