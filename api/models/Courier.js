const mongoose = require('mongoose');
const { Schema } = mongoose;

const courierSchema = new Schema({
    name : String,
    direction : String,
    onCharge : String,
    phone : Number
})

const Courier = mongoose.model("Courier", courierSchema)

module.exports = Courier