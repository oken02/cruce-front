const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  dniCuil: {
    type: Number,
    required : true,
  },
  password: String,
  role: {
    type: String,
    required: true,
    immutable: true
  },
  direction: String,
  courierId: {
    type: Schema.Types.ObjectId,
    ref: "Courier",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
