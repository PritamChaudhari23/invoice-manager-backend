require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async (callback) => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB via Mongoose");
    callback();
  } catch (error) {
    console.error("Failed to connect to MongoDB: ", error);
    process.exit(1);
  }
};

const getDb = () => {
  return mongoose.connection;
};

exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;