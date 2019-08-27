import mongoose from 'mongoose';
const Schema =mongoose.Schema;

let User=new Schema({
    name:{
        type:String,
        // required:true
    },
    mobileNumber:{
        type:String,
        // required:true
    },
    emailAddress:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    }
});

export default mongoose.model('User',User);