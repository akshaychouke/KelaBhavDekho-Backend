const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const authRoute = require("./Routes/Auth.js");
dotenv.config();
const connectDB = require("./Database/db.js");
const app = express();

//to connect Database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
