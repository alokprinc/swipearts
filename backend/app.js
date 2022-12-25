// initialization of express
const express = require("express");
const error = require("./middleware/error");
const cookie_parser = require("cookie-parser");
const app = express();
require("express-async-errors");
app.use(express.json());
app.use(cookie_parser());
// Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
// use Routes

app.use("/api/v1", product);
app.use("/api/v1", user);
// use error handler middleware
app.use(error);
module.exports = app;
