import mongoose from 'mongoose';
const { Schema } = mongoose;

const localSchema = new Schema({
    name : String,
    direction : String,
    onCharge : String,
    phone : Number
})

const Local = mongoose.model("Local", localSchema)

module.exports = Local