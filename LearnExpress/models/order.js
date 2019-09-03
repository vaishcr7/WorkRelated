// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');
//
// const Order=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncrement:true
//     }
// });
// module.exports=Order;


const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    products:[{
        product:{
            // type:mongoose.Schema.Types.ObjectId,
            // ref:'Product',
            type:Object,
            required:true
        },
        quantity: {
            required: true,
            type: String
        }
    }],
    user:{
        name:{
            type:String,
            required:true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }
});

module.exports=mongoose.model('Order',orderSchema);