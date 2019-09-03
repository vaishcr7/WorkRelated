const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Order_items=sequelize.define('order_items',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    quantity:{type:Sequelize.INTEGER}
});
module.exports=Order_items;