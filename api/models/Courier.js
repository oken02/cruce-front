const mongoose = require('mongoose');
const { Schema } = mongoose;

const courierSchema = new Schema({
  name: String,
  address: String,
  manager: String,
  phone: Number,
});

const Courier = mongoose.model("Courier", courierSchema);

module.exports = Courier;
