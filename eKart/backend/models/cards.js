import mongoose from 'mongoose';
const Schema =mongoose.Schema;

let Card=new Schema({
    cardNumber:{
        type:String,
        // required:true
    },
    expiryDate:{
        type:String,
        // required:true
    },
    nameOnCard:{
        type:String,
    }
});

export default mongoose.model('Card',Card);