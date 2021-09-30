const mongoose = require('mongoose');
const { Schema } = mongoose;

const branchSchema = new Schema({
    name : String,
    address : String,
    manager : String,
    phone : Number
})

const Branch = mongoose.model("Branch", branchSchema)

module.exports = Branch