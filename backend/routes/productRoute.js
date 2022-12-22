const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();
// Calling Routes
router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/update/:id").put(updateProduct);
router.route("/products/delete/:id").delete(deleteProduct);
router.route("/products/:id").get(getProductDetails);
// export
module.exports = router;
