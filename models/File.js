const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    file_url:{
        type:String,
        require:true
    },
    file_name:{
        type:String,
        require:true
    },
    key:{
        type:Number,
        require:true
    }
})
module.exports = mongoose.model("File",fileSchema)