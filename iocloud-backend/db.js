const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database! YAY");
  } catch (err) {
    console.log("Sorry, Unexpected Error" + err);
  }
};
module.exports = connectDB;
