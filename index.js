const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const authRoute = require("./Routes/Auth.js");
dotenv.config();
const connectDB = require("./Database/db.js");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
});
