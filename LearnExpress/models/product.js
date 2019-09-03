// // const path=require('path');
// // const fs=require('fs');
// // const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
// const cart=require('./cart');
// const db=require('../util/database');
// // const getProductsFromFile=cb=>{
// //     fs.readFile(p,(err,fileContent)=>{
// //         if(err)
// //            return cb([]);
// //         cb(JSON.parse(fileContent));
// //     });
// // }
// // const products=[];
// module.exports=class Product{
//     constructor(id,title,imageUrl,description,price)
//     {
//         this.id=id;
//         this.title=title;
//         this.imageUrl=imageUrl;
//         this.description=description;
//         this.price=price;
//     }
//     save(){
//         return db.execute('INSERT INTO Products (title,price,description,imageUrl) VALUES (?,?,?,?)',
//             [this.title,this.price,this.description,this.imageUrl]);
//             // products.push(this);
//             // getProductsFromFile(products => {
//             //     // console.log("save called for "+this.id);
//             //     if(this.id)
//             //     {
//             //         const existingProductIndex=products.findIndex(prod => this.id === prod.id);
//             //         const updatedProducts=[ ...products];
//             //         updatedProducts[existingProductIndex]=this;
//             //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//             //             console.log(err);
//             //         });
//             //     }
//             //     else {
//             //         // console.log("save called for new item");
//             //         this.id = Math.random().toString();
//             //         products.push(this);
//             //         fs.writeFile(p, JSON.stringify(products), (err) => {
//             //             console.log(err);
//             //         });
//             //     }
//             // });
//         }
//     static deleteById(id){
//         // products.push(this);
//         // getProductsFromFile(products => {
//         //         console.log("delete called for "+id);
//         //         const product=products.find(prod=>prod.id === id);
//         //         const updatedProducts=products.filter(prod => id !== prod.id);
//         //         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         //             if(!err){
//         //                 cart.deleteProduct(id,product.price);
//         //             }
//         //         });
//         // });
//     }
//     static fetchAll()//cb)
//     {
//         // getProductsFromFile(cb);
//         return db.execute('select * from products');
//     }
//     static findById(id)//,cb)
//     {
//         // getProductsFromFile(products=>{
//         //     const product=products.find(p=>p.id === id);
//         //     cb(product);
//         // });
//         return db.execute('select * from products where products.id = ?',[id]);
//     }
//
// }

// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
// const Product=sequelize.define('product',{
//    id:{
//        type:Sequelize.INTEGER,
//        autoIncrement:true,
//        allowNull:false,
//        primaryKey:true
//    },
//     title:Sequelize.STRING,
//     price:{
//        type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     description:{
//        type:Sequelize.STRING,
//         allowNull:false
//     },
//     imageUrl:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
// });
//
// const getDb=require('../util/database').getDb;
// const mongodb=require('mongodb');
//
// class Product{
//     constructor(id,title,imageUrl,description,price,userId)
//     {
//         this.title=title;
//         console.log(this.title);
//         this.imageUrl=imageUrl;
//         console.log(this.imageUrl);
//         this.description=description;
//         console.log(this.description);
//         this.price=price;
//         console.log(this.price);
//         // if(id)
//         //     id=new mongodb.ObjectId(id);
//         // else
//         // {
//         //     id=new mongodb.ObjectId();
//         //     console.log("creating new id for this product");
//         // }
//         this._id=id ? new mongodb.ObjectId(id):null;
//         // this._id=id;
//         //if product already exists then fetch it's previous id only else set it as null and inside save function provide it a unique id
//         console.log("id of this product= "+this._id);
//         this.userId=userId;
//     }
//     save(){
//         const db=getDb();
//         let dbOp;
//         if(this._id)
//         {
//             //update the product
//             console.log(this._id);
//             dbOp=db.collection('products')
//                 .updateOne(
//                     {_id: this._id},
//                     {$set:
//                         {
//                             // this
//                 title:this.title,
//                 imageUrl:this.imageUrl,
//                 description:this.description,
//                 price:this.price,
//                 id:this._id
//             }
//             });
//         }
//         else{
//             console.log("in else block");
//             this._id=new mongodb.ObjectId();
//             console.log("this product has a new id "+this._id);
//             dbOp=db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(result=>{console.log(result)})
//             .catch(err=>{console.log(err)});
//     }
//     static fetchAll(){
//         const db=getDb();
//         return db.collection('products').find().toArray()
//             .then(products=>{
//                 console.log(products);
//                 return products;
//             })
//             .catch(err=>{console.log(err)});
//     }
//     static findById(prodid){
//         const db=getDb();
//         return db.collection('products').find({_id: new mongodb.ObjectId(prodid)})
//             .next()
//             .then(product=>{
//                 console.log(product);
//                 return product;
//             })
//             .catch(err=>{console.log(err)})
//     }
//     static deleteById(prodId){
//         const db=getDb();
//         return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
//             .then(result=>{console.log("deleted "+result)})
//             .catch(err=>{console.log(err)});
//     }
// }
// module.exports=Product;

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
   title:{
       type:String,
       required:true
   },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=mongoose.model('Product',productSchema);