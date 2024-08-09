const File = require("../models/File");
var admin = require("firebase-admin");
const otpGenerator = require('otp-generator')

exports.uploadFile = async (req,res)=>{
    try{
        
        var bucket = admin.storage().bucket();
        const {file} = req.files;
        
        const extension = file.name.split(".")[1]
        
        const upload = await bucket.upload(file.tempFilePath, {  destination: file.tempFilePath+'.'+extension })
        
         
        const filepath = upload[0].metadata.name
        const file1 = bucket.file(filepath);


        const [url] = await file1.getSignedUrl({
            action: 'read', // Action can be 'read', 'write', or 'delete'
            expires: '03-09-2500' // Set the expiration date for the URL (far future date for indefinite access)
          });
          
        if(upload){
            const otp =  otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets:false, specialChars: false });
            
            const response = await File.create({file_url:url,key:otp,file_name:filepath});
            return res.status(200).json({
                message:"Uploaded",
                key:otp,
                url:url
            })
        }res.status(800).json({
            message:"error"
        })
        
    }catch(e){
        console.log(e)
        res.status(600).json({
            message:e.message
        })
    }
}
exports.download= async  (req,res)=>{
    try{
        const {key} = req.body;
        const file = await File.findOne({key});
        if(!file){
            return res.status(405).json({
                message:"invalid input key",
            })
        }
        const url = file.file_url;
  
        res.status(200).json({
            message:url,
         
        })
    }catch(e){
       
        res.status(600).json({
            message:e.message
        })
    }
}
exports.deleteion = async (req,res)=>{
    try{
        
        const {key} = req.body;
      
        var bucket = admin.storage().bucket();
        const response = await File.findOneAndDelete({key});
        await bucket.file(response.file_name).delete();
       
        res.status(200).json({
            message:"file deleted"
        })
    }catch(e){
      
        res.status(600).json({
            message:e.message
        })
    }
}