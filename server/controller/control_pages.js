 const admin_model = require('../models/register_admin');
exports.home = async(req,res)=>{
    const locals ={
           title:"Home"
    }
    res.render('userPages/home',locals);
}
exports.about = async(req,res)=>{
      const locals ={
           title:"About"
    }
    res.render('userPages/about',locals)
}

exports.contact = async(req,res)=>{
      const locals ={
           title:"Contact"
    }
    res.render('userPages/contact',locals)
}


exports.singleProduct = async(req,res)=>{
      const locals ={
           title:"Single Product"
    }
    res.render('userPages/product',locals)
}


//ADMIN END


exports.createAdmin = async(req,res)=>{
     const locals={
          title:"Create Admin"
     }
     res.render('admin/auth-register',locals);
}
exports.Admin = async(req,res)=>{
     const locals={
          title:"Admin-Login"
     }
     res.render('admin/auth-login',locals);
}
exports.lockScreen = async(req,res)=>{
      const locals={
          title:"Lock Screen"
     }
     res.render('admin/auth-lockscreen',locals);
}
exports.adminDashboard = async(req,res)=>{
     const locals={
          title:"Dashboard"
     }
         const getId = req.admin.id;
                await admin_model.findOne({_id:getId})
                .then(result=>{
                     
                     res.render('admin/dashboard',{locals,result});
                })
                .catch(err=>{
                     console.log(err.message);
                     res.json({error:err.message})
                })
     
    
}
exports.uploadProducts = async(req,res)=>{
       const locals={
          title:"Dashboard"
     }
       const getId = req.admin.id;
       await admin_model.findOne({_id:getId})
                .then(result=>{
                     
                     res.render('admin/products',{locals,result});
                })
                .catch(err=>{
                     console.log(err.message);
                     res.json({error:err.message})
                })

}
exports.logout = async(req,res)=>{
       res.clearCookie("jwt_admin_token");
    res.redirect('/lockscreen');
}