const Product = require("../models/productModel");

//create Product -- Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Read Products
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({ message: "Route Working!!!", product });
};
