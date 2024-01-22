const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileupload = require("express-fileupload");
const authRoute = require("./Routes/Auth.js");
const detailsRoutes = require("./Routes/Upload.js");
dotenv.config();
const connectDB = require("./Config/db.js");
const app = express();

//to connect Database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes
app.use("/auth", authRoute);
app.use("/api/details", detailsRoutes);

//server connection
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
