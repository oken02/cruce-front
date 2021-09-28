const mongoose = require("mongoose");
/* const config = require('../config') */

const connectionString = `mongodb://localhost:27017/cruce`;

module.exports = async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*  useFindAndModify: false,
      useCreateIndex: true */
  });
};
