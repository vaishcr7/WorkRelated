const path=require('path');
const express=require('express');
const router=express.Router();
const shopController=require('../controllers/shop');

router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts); //(req,res)=>{
    // console.log("in final middleware");
    // res.end();
    // res.end('<h1>hello from express response</h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(__dirname,'..','views','shop.html'));
    // res.render('shop');
//     const products=adminData.products;
//     res.render('shop',{pageTitle:"My Shop",prods:products, path:'/'});
// });

router.get('/products/:productId',shopController.getProduct);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.post('/cart_delete_item',shopController.postCartDeleteProduct);
router.post('/create_order',shopController.postOrder);
router.get('/orders',shopController.getOrders);
// router.get('/checkout',shopController.getCheckout);

module.exports=router;
// exports.shoproute=router;