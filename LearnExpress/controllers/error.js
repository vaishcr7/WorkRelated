exports.get404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','pageNF.html'));
    res.render('pageNF',{pageTitle:'Page Not Found!',path:'',isAuthenticated:req.isLoggedIn});
}

