const mongoose = require('mongoose');
/* const config = require('../config') */

const connectionString = `mongodb+srv://cruce:admin@cluster0.ruwjl.mongodb.net/test`

module.exports = async () => {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
     /*  useFindAndModify: false,
      useCreateIndex: true */
    });
  }