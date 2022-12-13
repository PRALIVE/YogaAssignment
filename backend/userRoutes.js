const express = require("express");
const router = express.Router();
const { registerUser, loginUser, payment, newpayment } = require("./userConroller");
const { protect } = require("./middleware/authMiddleWare");

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/payment").post(protect,payment);
router.route("/newpayment").post(protect, newpayment);

module.exports = router;