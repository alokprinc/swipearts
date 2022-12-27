const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();
// Calling Routes
router.route("/products").get(getAllProducts);
router
  .route("/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/products/update/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct);
router
  .route("/products/delete/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);
// export
module.exports = router;
