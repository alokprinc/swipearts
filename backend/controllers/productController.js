const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//create Product -- Admin
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Read Products
exports.getAllProducts = async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({ message: "Route Working!!!", product });
};

// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
};

// Get Product Details

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ErrorHandler("product not found!!!!!", 501);
  }

  res.status(200).json({
    success: true,
    product,
  });
};
