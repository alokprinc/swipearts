const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const Order = require("../models/orderModel");

// CREATE ORDER
exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    user,
    paymentInfo,
    paidAt,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    user: req.user._id,
    paymentInfo,
    paidAt: Date.now(),
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(200).json({
    success: true,
    order,
  });
};

// GET SINGLE ORDER
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    throw new ErrorHandler("Order Not Found", 404);
  }
  res.status(200).json({
    success: true,
    order,
  });
};

// GET MY_ORDERS
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    throw new ErrorHandler("Orders Not Found", 404);
  }
  res.status(200).json({
    success: true,
    orders,
  });
};

// GET ALL ORDERS -- ADMIN
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    throw new ErrorHandler("Orders Not Found", 404);
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

// UPDATE ORDER STATUS -- ADMIN
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ErrorHandler("Orders Not Found", 404);
  }
  if (order.orderStatus === "Delivered") {
    throw new ErrorHandler("Orders Already delivered", 404);
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (order.orderStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }
  order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// DELETE ORDER -- Admin
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ErrorHandler("Order not found with this Id", 404);
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
};
