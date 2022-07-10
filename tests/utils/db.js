const mongoose = require("mongoose");

const connectToMongo = async () => {
    let connect = await mongoose.connect("mongodb://0.0.0.0:27017/tddChat", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    });
    return connect;
  };

const diconnect = async () => {
    return await mongoose.connection.close();
}

module.exports = { connectToMongo, diconnect}