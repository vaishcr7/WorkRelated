// const http=require('http');
const express=require('express');
const app=express(); // calling a function inside express

// const db=require('./util/database');

// const mongoConnect=require('./util/database').mongoConnect;
const mongoose=require('mongoose');
const session=require('express-session');

// const db=require('./util/database');
// const Sequelize=require('sequelize');
// const sequelize=require('./util/database');
// const Product=require('./models/product');
const User=require('./models/user');
// const Cart=require('./models/cart');
// const Cart_Item=require('./models/cart_item');
// const Order=require('./models/order');
// const Order_items=require('./models/order_items');

// db.execute('select * from products')
//     .then(res=>{console.log(res)})
//     .catch(err=>{console.log(err)});
// const server=http.createServer(app);

const bodyParser=require('body-parser'); //used it to automatically use middleware's form details
app.use(bodyParser.urlencoded({extended:false}));

const path=require('path');

const MongoDBStore=require('connect-mongodb-session')(session);

//to use static content(css files here) , we have to take nodejs's help only and not express
app.use(express.static(path.join(__dirname,'public')));


const MNGODBURI='mongodb+srv://vibhor:vibhor@vibhorvaishdb-sm4et.mongodb.net/test';
const store=new MongoDBStore({
    uri:MNGODBURI,
    collection:'sessions'
});


app.use(session({secret:'my secret ',resave:false,saveUninitialized:false,store:store}));

// app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');

const authRoutes=require('./routes/auth');

// User.hasMany(Product);
// User.hasOne(Cart);
// Product.belongsTo(User,{constraints:true, onDelete:'Cascade'});
// Cart.belongsTo(User,{constraints:true, onDelete:'Cascade'});
//
// Cart.belongsToMany(Product,{through:Cart_Item});
// Product.belongsToMany(Cart,{through:Cart_Item});
//
// User.hasMany(Order);
// Order.belongsTo(User,{constraints:true, onDelete:'Cascade'});
//
// Order.belongsToMany(Product,{through:Order_items});
// Product.belongsToMany(Order,{through:Order_items});

// const User=require('./models/user');

app.use((req,res,next)=>{
    console.log("User is ");
    // User.findById('5d5c43640a043433684a08bf') // copied id from mongodb collection

    if(!req.session.user){ //in case session doesn't have a user rt now.
        console.log('here');
        return next();
    }
    User.findById(req.session.user) //added for session fetching
        .then(user=>{
            // req.user=new User(user.name,user.email,user.cart,user._id);
            // req.user=user; //mongoose
            // console.log("real user is "+user._id);

            req.user=user;
            console.log("inside app use: "+req.session.isLoggedIn);
            next();
        })
        .catch(err=>{
            console.log(err);
            console.log("real user is null");
        });
    // next();
});
// app.use(adminRoutes);
app.use('/admin',adminRoutes);  // only routes starting with admin should go to adminRoutes
//for eg) localhost/3000/admin/add_product

app.use(shopRoutes);
app.use(authRoutes);

// const errorController=require('./controllers/error');

// app.use(errorController.get404);  //(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','pageNF.html'));
    // res.render('pageNF',{pageTitle:'Page Not Found!',path:''});
// });


// sequelize.sync({force:false})
//     .then(res=>{return User.findByPk(1)})
//     .then(user=>{
//         if(!user)
//             return User.create({username:"defaultUser",password:"defaultPassword"})
//         return user;
//     })
//     .then(user=>{
//         console.log("user is "+user.id);
//         return user.createCart();
//     })
//     .then(cart=>{
//         console.log("creating cart");
//         app.listen(3001);
//     })
//     .catch(err=>{console.log(err)});

// mongoConnect(()=>{
//    app.listen(3000);
// });

mongoose.connect('mongodb+srv://vibhor:vibhor@vibhorvaishdb-sm4et.mongodb.net/test?retryWrites=true&w=majority')
.then(result=>{ User.findOne()
    .then(user=> {
        if (!user) {
            const user = new User({
                name: 'vibhor',
                email: 'brock.vaish@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
})
.catch(err=>{console.log(err)});