const path=require('path');
const express=require('express');
const router=express.Router();

const productsController=require('../controllers/admin.js');

// const products=[];
router.get('/add_product',productsController.getAddProduct);    //(req,res,next)=>{
    // console.log("in a middleware");
    // res.send('<form method="post" action="/add_product"><input type="text" name="title"><button type="submit" >Add Product</button></form>');
    // res.send('<form method="post" action="/admin/add_product"><input type="text" name="title"><button type="submit" >Add Product</button></form>');
    // res.sendFile(path.join(__dirname,'..','views','add_product.html'));
    // res.render('add_product',{pageTitle:'Add Product', path:'/admin/add_product'});
    // next(); // allows the control to flow to next middleware in line
// });
router.post('/add_product',productsController.postAddProduct);   //(req,res)=>{
    // console.log("in another middleware");
    // console.log(req.body);
    // products.push({title: req.body.title});
    // res.render('add_product');
    // res.redirect('/');
    // res.end('<h1>hello from express response</h1>');
// });
router.get('/products',productsController.getProducts);
router.get('/edit_product/:productId',productsController.getEditProduct);
// console.log("moving here");
router.post('/edit_product',productsController.postEditProduct);
router.post('/delete_product',productsController.postDeleteProduct);
module.exports=router;
// exports.routes=router;
// exports.products=products;