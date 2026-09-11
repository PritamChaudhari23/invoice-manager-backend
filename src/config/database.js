const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  return conn;
};

module.exports = connectDB;
