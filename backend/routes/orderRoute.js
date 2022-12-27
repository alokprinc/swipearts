const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");
// Router
const router = express.Router();
// Routes
router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/myOrders").get(isAuthenticated, myOrders);
router
  .route("/order")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);
router
  .route("/order/update/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);
//export
module.exports = router;
