const mongoose = require('mongoose');
const { Schema } = mongoose;

const localSchema = new Schema({
    name : String,
    address : String,
    manager : String,
    phone : Number
})

const Local = mongoose.model("Local", localSchema)

module.exports = Local