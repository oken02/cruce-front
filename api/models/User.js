const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: String,
  email: String,
  dniCuil: Number,
  password: String,
  rol: String,
  direction: String,
  courierId: {
    type: Schema.Types.ObjectId,
    ref: "Courier",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
