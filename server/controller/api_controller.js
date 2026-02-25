const admin_model = require('../models/register_admin');
const product_model = require('../models/products');
const users_model = require('../models/users');
const order_model = require('../models/order');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { State } = require('country-state-city');


require('dotenv').config();

exports.registerUsers = async(req,res)=>{

    const  firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
      const existingUser = await users_model.findOne({email});
      if(existingUser){
            res.json({message: existingUser.email + "User Exists",status:500});
      }else{
             
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(password,salt);
             await users_model.create({firstname:firstname,lastname,lastname,email:email,telephone:"",address:"",city:"",postalcode:"",country:"",state:"",password:hashedPassword})
             .then(async()=>{
                   res.status(200).json({message:"successfull"});
             }).catch(err=>{
                  res.status(500).json({error:"A database error occured "});
             })
      }

      
}

exports.userlogin = async(req,res)=>{
      const email = req.body.email;
      const password = req.body.password;
       try{
              const user = await users_model.findOne({email})
              if(!user){
                 return res.json({error: "User not Found", status:500});
              }else{
                        const isMatch = await bcrypt.compare(password,user.password);
                        if(!isMatch){
                            return res.json({error:"invalid Password",status:503})
                        }else{
                              const user_token = jwt.sign({id:user._id, name:user.firstname+" "+user.lastname},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1hr"});
                              res.cookie("user_jwt_token",user_token,
                                {
                                    httpOnly:true,
                                    maxAge:36000000
                                });
                            
                              return res.json({token:user_token,status:200})
                        }
              }
       }catch(err){
           res.json({error:err.message})
       }
      
}

exports.getCountrySate = async(req,res)=>{
     const countryCode = req.params.countryCode;
     const states = State.getStatesOfCountry(countryCode);
     res.json(states);
}

exports.oderedItems = async(req,res)=>{
      const userid = req.body.userid;
       const firstname = req.body.firstname;
       const lastname = req.body.lastname;
       const email = req.body.email;
       const tel = req.body.tel;
       const city = req.body.city
       const postalcode = req.body.postalcode;
       const country = req.body.country;
       const state = req.body.state;
       const address = req.body.address;

       const cart = req.body.cart;
       try{

            let total = 0;
            cart.forEach(function(item){
                total +=item.productPrice * item.qty;

            });
                const getuser = await users_model.findOne({_id:userid});
                if(getuser.address!="" && getuser.postalcode !="" && getuser.city !="" ){

                      const newOrder = await order_model.create({user:userid, items:cart,totalAmount:total});
                            if(newOrder){
                            
                                res.json({status:200});
                            }

                }else{
                       const updateUser = await users_model.updateOne({_id:userid},{
                                     email:email,
                                     telephone:tel,
                                     address:address,
                                     city:city,
                                     postalcode:postalcode,
                                     country:country,
                                     state:state
                                    });
                            if(updateUser){
                                 const newOrder = await order_model.create({user:userid, items:cart,totalAmount:total});
                                if(newOrder){
                                
                                    res.json({status:200});
                                }
                            }
                           
                }

       }catch(err){
           console.log(err.message);
       }

}

// ADMIN
exports.createAdmin = async (req, res) => {
    const { username, password } = req.body;
    await admin_reg.create({ username: username, password: password })
        .then(result => {
            res.status(200).json({ message: "Successfull", data: result })
        }).catch(error => {
            res.status(500).json({ Error: error.message });
        })
}

exports.auth_login = async (req, res) => {
    const { username, password } = req.body;
    const authAdmin = await admin_model.findOne({ username: username, password: password });
    if (!authAdmin) {
        return res.json({ status: "failed", message: "Incorrect Username/Password" });
    } else {
        const adminToken = jwt.sign({ id: authAdmin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
        res.cookie("jwt_admin_token", adminToken, { httpOnly: true, maxAge: 36000000 });
        return res.json({ token: adminToken, status: "success" });


    }
}
exports.uploadProducts = async (req, res) => {
    const category = req.body.category;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const size = req.body.sizes;
    const color = req.body.color;
    const image = req.file.filename;
    const des = req.body.description
    await product_model.create({ category: category, Name: name, price: price, quantity: quantity, sizes: size, color: color, image: image, description: des })
        .then(result => {
            res.json({status: "success", data: result, message: "Your product has been uploaded successfully" })
        }).catch(err => {
            res.json({ error: err.message, status: 500 })
        })
}

exports.editProduct = async (req, res) => {

    const category = req.body.category;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const size = req.body.sizes;
    const color = req.body.color;
    image = req.file.filename;
    const des = req.body.description;
    const status = req.body.status;
    const id = req.body.id;
    await product_model.updateOne({ _id: id }, { category: category, Name: name, price: price, quantity: quantity, sizes: size, color: color, image: image, description: des, status:status })
        .then(result => {
            res.json({ status: "success", message: "Producted has been updated successfully", result: result })
        }).catch(err => {
            res.json({ error: err.message, status: 500 })
        });


}

exports.deleteProduct = async (req, res) => {
    const id = req.body.id;

    try {
        const product = await product_model.findOne({ _id: id });
        if (!product) {
            console.log("product not found")
            res.status(404).json({ status: "error", message: "product not found" });
        }
        const imagePath = path.join(process.cwd(), 'public/uploads/', product.image);
        //delete image if exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath, (err) => {
                if (err) console.log('image delete err: ', err)
            })
        } else {
             console.log('Image not found:', imagePath);
        }
        const deleteproduct = await product_model.deleteOne({ _id: id });
        if (deleteproduct) {
            res.json({ status: "success", message: "Product has been deleted Successfully" })
        } else {
            res.json({ status: "error", message: "failed to delete product" })
        }
    } catch (err) {
        res.json({ error: err.message, status: 500 })
    }
}
exports.bigBannerUpload = async(req,res)=>{
    console.log("FileName:"+req.file.filename);
}