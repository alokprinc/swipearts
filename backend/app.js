// initialization of express
const express = require("express");
const error = require("./middleware/error");
const app = express();
require("express-async-errors");
app.use(express.json());

// Route imports
const product = require("./routes/productRoute");

// use Routes

app.use("/api/v1", product);
app.use(error);
module.exports = app;
