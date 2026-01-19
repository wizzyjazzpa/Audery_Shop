exports.home = async(req,res)=>{
    const locals ={
           title:"Home"
    }
    res.render('home',locals);
}