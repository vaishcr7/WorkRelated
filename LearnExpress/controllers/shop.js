const Product = require('../models/product');
// const Cart = require('../models/cart');
const Order=require('../models/order');

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    Product.find() //fetchall method not provided in mongoose
    // Product.fetchAll()
        .then((rows)=>{
            res.render('shop/product_list', {
                prods:rows,
                pageTitle: 'All Products',
                path: '/products'
                ,isAuthenticated:req.isLoggedIn
            })})
        .catch(err=>{console.log(err)});
    // Product.fetchAll()
    //     .then(([rows,fieldData])=>{
    //         res.render('shop/product_list', {
    //             prods:rows,
    //             pageTitle: 'All Products',
    //             path: '/products'
    //         })})
    //     .catch(err=>{console.log(err)});
    // Product.fetchAll(products => {
    //     res.render('shop/product_list', {
    //         prods: products,
    //         pageTitle: 'All Products',
    //         path: '/products'
    //     });
    // });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findById(prodId, product => {
    //     res.render('shop/product_details', {
    //         product: product,
    //         pageTitle: product.title,
    //         path: '/products'
    //     });
    // });
    // Product.findByPk(prodId)
    Product.findById(prodId)
    // Product.find.findById(prodId) //mongoose
        .then(product=>{
            res.render('shop/product_details', {
                product: product,
                pageTitle: product.title,
                path: '/products'
                ,isAuthenticated:req.isLoggedIn
            });
        })
        // .then(([rows,fieldData])=>{
        //     res.render('shop/product_details', {
        //         product: rows[0],
        //         pageTitle: rows[0].title,
        //         path: '/products'
        //     });
        // })
        .catch((err)=>{console.log(err)});
};

exports.getIndex = (req, res, next) => {
    // Product.findAll()
    Product.find()
    // Product.fetchAll()
        .then((products) => {
            res.render('shop/product_list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated:(req.session.isLoggedIn==null)?false:req.session.isLoggedIn
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
    // Product.fetchAll()
    //     .then(([rows,fieldData])=>{
    //         res.render('shop/product_list', {
    //             prods:rows,
    //             pageTitle: 'Shop',
    //             path: '/'
    //         })})
    //     .catch(err=>{console.log(err)});
    // Product.fetchAll(products => {
    //     res.render('shop/index', {
    //         prods: products,
    //         pageTitle: 'Shop',
    //         path: '/'
    //     });
    // });

exports.getCart = (req, res, next) => {
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             console.log(cart.products);
    //             const cartProductData = cart.products.find(
    //                 prod => prod.id === product.id
    //             );
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty: cartProductData.qty });
    //             }
    //         }
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products: cartProducts
    //         });
    //     });
    // });
    req.user
        // .getCart()
        .populate('cart.items.productId')
        .execPopulate()
        // .then(cart=>{
            // cart.getProducts()
            .then(user=>{
                console.log(user.cart.items);
                const products=user.cart.items;
            //     .then(products=>{
            //         console.log("products are");
            //         products.map(prod=>{
            //             console.log(prod._id);
            //             console.log(prod.quantity);
            //         });
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                        ,isAuthenticated:req.isLoggedIn
                    })
                })
                .catch(err=>{console.log(err)})
        // })
        // .catch(err=>{console.log(err)})
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product=>{
            console.log("adding a product to cart for user "+product);
            return req.user.addToCart(product);
        })
        .then(result=>{
            console.log(result);
            res.redirect('/cart');
        });

    // Product.findById(prodId, product => {
    //     Cart.addProduct(prodId, product.price);
    // });
    // res.redirect('/cart');


    // let fetchedCart;
    // let newQuantity = 1;
    // req.user.getCart()
    //     .then(cart=>{
    //         fetchedCart=cart;
    //         return cart.getProducts({where: {id:prodId}});
    //     })
    //     .then(products=> {
    //         let product;
    //         if (products.length > 0)
    //             product = products[0];
    //         if (product) {
    //             newQuantity=1+product.cart_item.quantity;
    //             return product;
    //         }
    //         return Product.findByPk(prodId);
    //     })
    //     .then(product=>{
    //         return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
    //     })
    //     .then(()=>{
    //         res.redirect('/cart');
    //     })
    //     .catch(err=>{console.log(err)});
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // Product.findById(prodId, product => {
    //     Cart.deleteProduct(prodId, product.price);
    //     res.redirect('/cart');
    // });
    req.user
        // .deleteCartItemFromCart(prodId)
        .removeFromCart(prodId) //for mongoose
        // .getCart()
        // .then(cart=>{
        //     return cart.getProducts({where:{id:prodId}});
        // })
        // .then(products=>{
        //     let product=products[0];
        //     return product.cart_item.destroy();
        // })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err=>{console.log(err)});
};

exports.getOrders = (req, res, next) => {

    // req.user.getOrders({include:['products']})
    //     .then(orders=>{
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Your Orders',
    //             orders:orders
    //         })
    //     })
    //     .catch(err=>{console.log(err)});

    // req.user.getOrders()
    //     .then(orders=>{
    //         res.render('shop/orders', {
    //             path: '/orders',
    //             pageTitle: 'Your Orders',
    //             orders:orders
    //         })
    //     })
    //     .catch(err=>{console.log(err)});

    // console.log("true or false:");
    // console.log(req.user._id == '5d5c43640a043433684a08bf');
    // let s=req.user._id.toString();
    // console.log(req.user._id);
    Order.find({})
        .then(res=>{
            console.log("got result: "+res[0]);
            if(res[0].user.userId==req.user._id.toString())
                return res;
        })
        .then(orders=>{
            console.log("orders are "+orders);
            res.render('shop/orders', {
                    path: '/orders',
                    pageTitle: 'Your Orders',
                    orders:orders
                ,isAuthenticated:req.isLoggedIn
                })
        })
        .catch(err=>{console.log(err)});
};

exports.postOrder=(req,res,next)=>{

    // let fetchedCart;
    // req.user
    //     .addOrder()
    //     // .getCart()
    //     // .then((cart)=>{
    //     //     fetchedCart=cart;
    //     //     return cart.getProducts();
    //     // })
    //     // .then((products)=>{
    //     //     // console.log(products);
    //     //     return req.user.createOrder()
    //     //         .then((order)=>{
    //     //             return order.addProducts(products.map(product=>{
    //     //                 product.order_items={quantity:product.cart_item.quantity};
    //     //                 return product;
    //     //                 })
    //     //             );
    //     //         })
    //     //         .catch(err=>{console.log(err)});
    //     // })
    //     // .then(result=>{
    //     //     return fetchedCart.setProducts(null);
    //     // })
    //     .then(result=>{res.redirect('/orders')})
    //     .catch(err=>{console.log(err)});


    // .getCart()
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products=user.cart.items.map(i=>{
                return {quantity:i.quantity, product:{...i.productId._doc}} //get all metadata related to part. product using doc and ... adds all of it to a new object inside product
            });
            const order=new Order({
                user:{
                    name:req.user.name,
                    userId:req.user
                },
                products:products
            });
            return order.save();
        })
        .then(res=>{
            return req.user.clearCart();
        })
        .then(()=>{
            res.redirect('/orders');
        })
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
        ,isAuthenticated:req.isLoggedIn
    });
};
