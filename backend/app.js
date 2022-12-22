// initialization of express
const express = require("express");
const app = express();
app.use(express.json());

// Route imports
const product = require("./routes/productRoute");

// use Routes

app.use("/api/v1", product);

module.exports = app;
