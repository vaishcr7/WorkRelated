// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
//
// const User=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     username:Sequelize.STRING,
//     password:Sequelize.STRING
// });

// const getDb=require('../util/database').getDb;
// const mongodb=require('mongodb');
// class User{
//     // constructor(username,email){
//     //     this.name=username;
//     //     this.email=email;
//     // }
//     constructor(username,email,cart,id){
//         this.name=username;
//         this.email=email;
//         this.cart=cart; //cart= {items:[]}
//         this._id=id;
//     }
//
//     save(){
//         const db=getDb();
//         return db.collection('users').insertOne(this)
//             .then(result=>{
//                 console.log("inserted "+result);
//                 return result;
//             })
//             .catch(err=>{console.log(err)});
//     }
//     addToCart(product){
//         const cartProductIndex=this.cart.items.findIndex(cp=>{
//             return cp.productId.toString() == product._id.toString();
//         })
//         let newQuantity=1;
//         const updatedCartItems=[...this.cart.items];
//         if(cartProductIndex!=-1){
//             newQuantity=this.cart.items[cartProductIndex].quantity+1;
//             updatedCartItems[cartProductIndex].quantity=newQuantity;
//         }
//         else{
//             updatedCartItems.push({productId: new mongodb.ObjectId(product._id),quantity:newQuantity})
//         }
//
//         const updateCart={items:updatedCartItems};
//         console.log("new cart is "+updateCart.items[0]);
//         const db=getDb();
//         return db.collection('users').updateOne(
//             {_id:new mongodb.ObjectId(this._id)},
//             {$set:{cart:updateCart}}
//         );
//     }
//
//     getCart(){
//         const db=getDb();
//         const productIds=this.cart.items.map(product=>{
//             return product.productId;
//         });
//         return db.collection('products').find({_id: {$in:productIds}}).toArray()
//             .then(products=>{
//                 let temp= products.map(p=>{
//                     let item= {
//                         ...p, quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                     console.log("item inside map is "+item);
//                     return item;
//                 });
//                 console.log("temp is "+temp);
//                 return temp;
//             });
//     }
//     deleteCartItemFromCart(prodId){
//         const updatedCartItems=this.cart.items.filter(prod=>{
//             return prod.productId.toString() !== prodId.toString();
//         })
//         const db=getDb();
//         return db.collection('users').updateOne(
//             {_id:new mongodb.ObjectId(this._id)},
//             {$set:{cart:{items:updatedCartItems}}}
//         );
//     }
//     addOrder(){
//         const db=getDb();
//         return this.getCart()
//             .then(products=> {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new mongodb.ObjectId(this._id),
//                         name: this.name
//                     }
//                 };
//                 return db.collection('orders').insertOne(order)
//             })
//             .then(result=>{
//                 this.cart=[{items:[]}]
//                 return db.collection('users').updateOne(
//                     {_id:new mongodb.ObjectId(this._id)},
//                     {$set:{cart:{items:[]}}}
//                 );
//             })
//             .catch(err=>{console.log(err)});
//     }
//     getOrders(){
//         const db=getDb();
//         return db.collection('orders').find({'user._id':new mongodb.ObjectId(this._id)}).toArray();
//     }
//     static findById(userId){
//         const db=getDb();
//         return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
//             .then(result=>{
//                 console.log("found user "+result._id);
//                 return result;
//             })
//             .catch(err=>{console.log(err)});
//     }
// }

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});
userSchema.methods.addToCart=function(product){
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.productId.toString() == product._id.toString();
        })
        let newQuantity=1;
        const updatedCartItems=[...this.cart.items];
        if(cartProductIndex!=-1){
            newQuantity=this.cart.items[cartProductIndex].quantity+1;
            updatedCartItems[cartProductIndex].quantity=newQuantity;
        }
        else{
            updatedCartItems.push({
                productId: product._id, //mongoose automatically wraps this in a ObjectId
                quantity:newQuantity
            })
        }

        const updateCart={items:updatedCartItems};
        console.log("new cart is "+updateCart.items[0]);
        this.cart=updateCart;
        return this.save();
        // const db=getDb();
        // return db.collection('users').updateOne(
        //     {_id:new mongodb.ObjectId(this._id)},
        //     {$set:{cart:updateCart}}
        // );
}
userSchema.methods.removeFromCart=function(prodId){
        const updatedCartItems=this.cart.items.filter(prod=>{
            return prod.productId.toString() !== prodId.toString();
        })
        this.cart.items=updatedCartItems;
        return this.save();
    }

userSchema.methods.clearCart=function () {
    this.cart={items:[]};
    return this.save();
    }

module.exports = mongoose.model('User', userSchema);

// module.exports=User;