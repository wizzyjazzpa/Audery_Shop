const admin_model = require('../models/register_admin');
const product_model = require('../models/products');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createAdmin = async(req,res)=>{
      const{ username,password} = req.body;
       await admin_reg.create({username:username,password:password})
       .then(result=>{
            res.status(200).json({message:"Successfull", data:result})
       }).catch(error=>{
            res.status(500).json({Error:error.message});
       })
}

exports.auth_login = async(req,res)=>{
    const {username,password}=req.body;
    const  authAdmin= await admin_model.findOne({username:username,password:password});
    if(!authAdmin){
       return res.json({status:"failed",message:"Incorrect Username/Password"});
    }else{
           const adminToken = jwt.sign({id:authAdmin._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
           res.cookie("jwt_admin_token",adminToken,{httpOnly:true,maxAge:36000000});
           return res.json({token:adminToken,status:"success"});


    }
}
exports.uploadProducts = async(req,res)=>{
      console.log(req.body)
      console.log(req.file.filename)
     const category = req.body.category;
     const name = req.body.name;
     const price = req.body.price;
     const quantity = req.body.quantity;
     const size = req.body.sizes;
     const color = req.body.color;
     const image = req.file.filename;
     const des = req.body.description
     await product_model.create({category:category,Name:name,price:price,quantity:quantity,sizes:size,color:color,image:image,description:des} )
     .then(result=>{
         res.json({status:"success", data:result,message:"Your product has been uploaded successfully"})
    }).catch(err=>{
         res.json({error:err.message,status:500})
    })
}