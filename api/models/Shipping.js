const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientAddressSchema = new Schema({
    province : String,
    city: String,
    addressType: String,
    receiverName: String,
    street : String,
    numberStreet : Number,
    complement : String,
    neighborhood : String,
    reference: String,
    postalCode: Number,
})

const clientSchema = new Schema({
    firstName: String,
    lastName : String,
    document : Number,
    email: String,
    phone: Number,
    address: clientAddressSchema
})

//Ver tipo date por Excel
const productSchema = new Schema({
   courrier: String,
   estimateDeliveryDate: Date,
   deliveryDeadline : String,
   status : String, 
   paymentSystem: String,
   installments: Number,
   paymentValue: String,
   quantity : Number,
   productId : Number,
   categoryId : String,
   referenceCode : String,
   productName: String,
   productsValue : Number,
   sellingPrice : Number,
   totalPrice : Number,
   shippingPrice: Number,
   shippingValue : Number,
   totalValue: Number,
   discountsTotals: Number
})

const stateSchema = new Schema({
    state : String,
    date : Date,
})

//---------------------------------
//Verificar el ActualState con hook

const shippingSchema = new Schema({
    client : clientSchema,
    product : [productSchema],
    observations : String,
    localId : {
        type : Schema.Types.ObjectId,
        ref: "Local"
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    courierId: {
        type: Schema.Types.ObjectId,
        ref : "Courier"
    },
    stateHistory : [stateSchema],

    //**********/
    actualState : String,
    //*********/
})

const Shipping = mongoose.model("Shipping", shippingSchema)

module.exports = Shipping

