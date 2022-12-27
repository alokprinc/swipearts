const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getUserDetailsAdmin,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();
// Calling Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updateUserPassword);
router.route("/me/update").put(isAuthenticated, updateUserProfile);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUserDetailsAdmin)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);
// export
module.exports = router;
