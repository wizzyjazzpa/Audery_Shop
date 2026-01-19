exports.home = async(req,res)=>{
    const locals ={
           title:"Home"
    }
    res.render('home',locals);
}
exports.about = async(req,res)=>{
      const locals ={
           title:"About"
    }
    res.render('about',locals)
}

exports.contact = async(req,res)=>{
      const locals ={
           title:"Contact"
    }
    res.render('contact',locals)
}


exports.singleProduct = async(req,res)=>{
      const locals ={
           title:"Single Product"
    }
    res.render('product',locals)
}