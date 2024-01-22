const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to database", error.message);
  }
};

module.exports = connectDB;
