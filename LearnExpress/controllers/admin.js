const Product=require('../models/product');
// const mongodb=require('mongodb');
// const ObjectId=mongodb.ObjectID;

const mongoose=require('mongoose');

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/add_product',{pageTitle:'Add Product', path:'/admin/add_product',editing:false,isAuthenticated:req.isLoggedIn});//editing set false to not edit product here
};
exports.postAddProduct=(req,res,next)=>{
    // const products=[];
    // products.push({title: req.body.title});
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const description=req.body.description;
    const price=req.body.price;
    console.log("Creating a new product for user"+req.user.id);
    // const products=new Product(null,title,imageUrl,description,price,req.user.id);
    const product=new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user
    })
    // products.save()
    //     .then(()=>{res.redirect('/');})
    //     .catch(err=>{console.log(err)});
    // res.redirect('/');
    // const product=new Product(title,imageUrl,description,price);

    // products.save()
        product.save()   // this save method is provided by mongoose
        .then(()=>{
            console.log("created a product");
            res.redirect('/admin/products');})
        .catch(err=>{console.log(err)});
    // console.log("yeh hai "+req.user);
    // Product.create({
    // req.user.createProduct({
    //     title:title,
    //     description:description,
    //     imageUrl:imageUrl,
    //     price:price
    // })
    // .then((result)=>{
    //     // console.log(result);
    //     res.redirect('/admin/products');
    //     })
    // .catch(err=>console.log(err));
};

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    // console.log(editMode);
    if(!editMode)
    {
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    // console.log(prodId);
    // Product.findById(prodId,product=>{
    //     if(!product)
    //     {
    //         console.log("product does not exist");
    //         res.redirect('/');
    //     }
    //     res.render('admin/edit_product',{pageTitle:"Edit Product",path:'/admin/edit_product',editing:editMode,product:product});
    // });

    // Product.findByPk(prodId)
        Product.findById(prodId)
        .then(product=>{
            res.render('admin/edit_product',{pageTitle:"Edit Product",path:'/admin/edit_product',editing:editMode,product:product,isAuthenticated:req.isLoggedIn})})
        .catch(()=>{
                console.log("product does not exist");
                res.redirect('/');
            });
};

exports.postEditProduct=(req,res,next)=>{   //create a new edited copy of produce and replace the original one
    // console.log("trying to render post edit template");
    const prodId=req.body.productId;
    // console.log("product id is "+prodId);
    const updatedTitle=req.body.title;
    const updatedPrice=req.body.price;
    const updatedDescription=req.body.description;
    const updatedImageUrl=req.body.imageUrl;
    // const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice);
    // Product.findByPk(prodId)

    // const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice,new MongoDb.ObjectID(prodId));
    //for mongoose
    Product.findById(prodId)
        .then(product=>{
            product.title=updatedTitle;
            product.price=updatedPrice;
            product.description=updatedDescription;
            product.imageUrl=updatedImageUrl;
            return product.save();
        })
        .then(result=>{
            console.log("updated product");
            res.redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/admin/products');
        });
    // Product.findByPk(prodId)
    //     .then(product=>{
    //         product.title=updatedTitle;
    //         product.price=updatedPrice;
    //         product.description=updatedDescription;
    //         product.imageURL=updatedImageUrl;
    //         product.save();
    //     })
//     updatedProduct.save()
//         .then(()=> {
//             console.log("updated product");
//             res.redirect('/admin/products');
//         })
//         .catch((err)=>console.log(err))
};

exports.postDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    // Product.findByPk(prodId)
    // Product.findById(prodId)
    //     .then((product)=>{
    //       return product.destroy();
    //     })
    // Product.deleteById(prodId)
    Product.findByIdAndRemove(prodId)  //method provided by mongoose
        .then(()=>{
            console.log("destroyed product");
            res.redirect('/admin/products');
        })
        .catch((err)=>{console.log(err)})
};

exports.getProducts=(req,res,next)=>{
    // console.log("in final middleware");
    // res.end();
    // res.end('<h1>hello from express response</h1>');
    // console.log(adminData.products);
    // res.sendFile(path.join(__dirname,'..','views','shop.html'));
    // res.render('shop');
    // const products=[];
    // Product.fetchAll(products=> {
    //     res.render('admin/products', {pageTitle: "Admin Products", prods: products, path: '/admin/products'})
    // });

    // Product.findAll()
    // req.user.getProducts()
    Product.find() //mongoose fetchall doesn't exist
    // Product.fetchAll()
    //     .select('title price -_id') // special mongoose function that displays only the mentioned details ,also adding a minus sign explicitly exlcudes those details like id here.
    //     .populate('userId','name') //special mongoose function that populates  the field mentioned ,in this case provides more details about user and not just his id. Second option attribute can be used to populate only the selected attributes.
        .then(products=>{
            console.log(products)
            res.render('admin/products', {pageTitle: "Admin Products", prods: products, path: '/admin/products',isAuthenticated:req.isLoggedIn})
        })
        .catch(err=>{console.log(err)})
};

