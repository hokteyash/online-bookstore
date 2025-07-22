const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    shipping_address : {
      street_name: {
        type: String,
      },
      house_no: {
        type: Number,
      },
      pincode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    total_price:{
        type:Number,
        required:true
    },
    payment_method:{
        type:String,
        enum:['cod','upi'],
        default:'upi'
    },
    payment_status:{
        type:String,
        enum:['pending','paid','failed','refunded'],
        default:'pending'
    },
    order_status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled'],
        default:'pending'
    },
    paidAt:{
        type:Date,
        default:null
    },
    shippedAt:{
        type:Date,
        default:null
    },
    deliveredAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('Order', orderSchema);