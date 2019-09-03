const User=require('../models/user');

exports.getLogin=(req,res,next)=>{
    // const isLoggedIn=req.get('Cookie').trim().split('=')[1].trim() === 'true';
    console.log("authenticated value: "+req.session.isLoggedIn);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login',
        isAuthenticated:(req.session.isLoggedIn==null)?false:req.session.isLoggedIn
    });
};

exports.postLogin=(req,res,next)=>{
    // req.isLoggedIn=true;
    // res.setHeader('Set-Cookie','isLoggedIn=true'); // setting cookie is like a key value pair
    User.findById('5d5c43640a043433684a08bf')
        .then(user=>{
            req.session.isLoggedIn=true;
            console.log('setting login var '+req.session.isLoggedIn);
            req.session.user=user;
            req.session.save((err=>{
                console.log(err);
                res.redirect('/');
            }));
        })
        .catch(err=>{console.log(err);});
};

exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    })
}