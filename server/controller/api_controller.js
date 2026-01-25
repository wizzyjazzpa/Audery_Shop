const admin_model = require('../models/register_admin');
const product_model = require('../models/products');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


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
            res.json({ status: "success", data: result, message: "Your product has been uploaded successfully" })
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
    const id = req.body.id;
    await product_model.updateOne({ _id: id }, { category: category, Name: name, price: price, quantity: quantity, sizes: size, color: color, image: image, description: des })
        .then(result => {
            res.json({ status: "success", message: "Producted has been updated successfully", result: result })
        }).catch(err => {
            res.json({ error: err.message, status: 500 })
        });


}

exports.deleteProduct = async (req, res) => {
    const id = req.body.id;
    
    try {
        const product = await product_model.findOne({_id:id});
        if (!product) {
            console.log("product not found")
            res.status(404).json({ status: "error", message: "product not found" });
        }
        const imagePath = path.join(process.cwd(),'public/uploads/', product.image);
        //delete image if exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath,(err)=>{
                if(err) console.log('image delete err: ',err)
            })
        }else{
             console.log('Image not found:', imagePath);
        }
        const deleteproduct= await product_model.deleteOne({_id: id });
        if(deleteproduct){
                  res.json({staus:"success",message:"Product has been deleted Successfully"})
        }else{
                res.json({staus:"error",message:"failed to delete product"})
        }
    } catch (err) {
             res.json({ error: err.message, status: 500 })
    }
}