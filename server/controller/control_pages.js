const admin_model = require('../models/register_admin');
const product_model = require('../models/products');
exports.home = async (req, res) => {
     const locals = {
          title: "Home"
     }
     res.render('userPages/home', locals);
}
exports.about = async (req, res) => {
     const locals = {
          title: "About"
     }
     res.render('userPages/about', locals)
}

exports.contact = async (req, res) => {
     const locals = {
          title: "Contact"
     }
     res.render('userPages/contact', locals)
}


exports.singleProduct = async (req, res) => {
     const locals = {
          title: "Single Product"
     }
     res.render('userPages/product', locals)
}


//ADMIN END


exports.createAdmin = async (req, res) => {
     const locals = {
          title: "Create Admin"
     }
     res.render('admin/auth-register', locals);
}
exports.Admin = async (req, res) => {
     const locals = {
          title: "Admin-Login"
     }
     res.render('admin/auth-login', locals);
}
exports.lockScreen = async (req, res) => {
     const locals = {
          title: "Lock Screen"
     }
     res.render('admin/auth-lockscreen', locals);
}
exports.adminDashboard = async (req, res) => {
     const locals = {
          title: "Dashboard"
     }
     try {
          const getId = req.admin.id;
          const result = await admin_model.findOne({ _id: getId })
          const countProduct = await product_model.countDocuments();
          res.render('admin/dashboard', { locals, result,countProduct });

     } catch (err) {
          console.log(err.message);
          res.json({ error: err.message })
     }




}
exports.uploadProducts = async (req, res) => {
     const locals = {
          title: "Dashboard"
     }
     const getId = req.admin.id;
     await admin_model.findOne({ _id: getId })
          .then(result => {

               res.render('admin/products', { locals, result });
          })
          .catch(err => {
               console.log(err.message);
               res.json({ error: err.message })
          })

}
exports.viewProducts = async (req, res) => {
     const locals = {
          title: "View Products"
     }
     const getId = req.admin.id;
     try {
          const result = await admin_model.findOne({ _id: getId });
          const products = await product_model.find();
          res.render('admin/viewproducts', { locals, result, products });
     } catch (err) {
          console.log(err.message);
          res.json({ error: err.message })
     }


}

exports.edit_single_product = async (req, res) => {
     locals = {
          title: "Edit Single Product"

     }

     const getId = req.admin.id;
     const productId = req.query.id;

     try {
          const result = await admin_model.findOne({ _id: getId });
          const product = await product_model.findOne({ _id: req.query.id });
          res.render('admin/editproduct',
               {
                    locals,
                    result,
                    product
               });
     } catch (err) {

          console.log(err.message);
          res.json({ error: err.message })
     }
}
 exports.banner = async(req,res)=>{

     locals = {
          title: "Banner"

     }
     const getId = req.admin.id;
     await admin_model.findOne({ _id: getId })
          .then(result => {

               res.render('admin/Banners', { locals, result });
          })
          .catch(err => {
               console.log(err.message);
               res.json({ error: err.message })
          })
 }
exports.logout = async (req, res) => {
     res.clearCookie("jwt_admin_token");
     res.redirect('/lockscreen');
}