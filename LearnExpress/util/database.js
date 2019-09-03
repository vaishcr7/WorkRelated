// const mysql= require('mysql2');
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'password'
// });
// module.exports=pool.promise();

// const Sequelize=require('sequelize');
// const sequelize =new Sequelize('node_complete','root','password',
//     {dialect:'mysql',host:'localhost'});
// module.exports=sequelize;

const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=callback=>{
const uri='mongodb+srv://vibhor:vibhor@vibhorvaishdb-sm4et.mongodb.net/test?retryWrites=true';
MongoClient.connect(uri)
    .then((client)=>{
        console.log("connected");
        _db=client.db();
        callback();
    })
    .catch(err=> {
        console.log(err);
        throw err;
    });
};

const getDb=()=>{
    if(_db)
        return _db;
    throw 'No database found'
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;