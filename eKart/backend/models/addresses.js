import mongoose from 'mongoose';
const Schema =mongoose.Schema;

let Address=new Schema({
    address:{
        type:String,
        // required:true
    },
    city:{
        type:String,
        // required:true
    },
    state:{
        type:String,
        // required:true
    },
    pin_code:{
        type:String,
        // required:true
    },
    phoneNumber:{
        type:String,
        // required:true,
    },
    userInfo:{
        type:String,
    }
});

export default mongoose.model('Address',Address);