const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (error) {
    if (error) {
      console.log(error, "Error connecting to db");
      process.exit(1);
    }
  }
};

module.exports = connectDB;
