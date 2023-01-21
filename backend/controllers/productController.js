const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//create Product -- Admin
exports.createProduct = async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// Read Products
exports.getAllProducts = async (req, res, next) => {
  const resultsPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({ message: "Route Working!!!", products, productCount });
};

// Update Product -- Admin

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new ErrorHandler("product not found!!!!!", 501);
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
    throw new ErrorHandler("product not found!!!!!", 501);
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

// Product review or Update review
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating,
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.forEach((review) => {
    review.user + "" === req.user._id + "";
  });

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user + "" === req.user._id + "") {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

// Get All Reviews of a product
exports.getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

exports.deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 404);
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};
