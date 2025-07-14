const express = require("express");
const {
  getCart,
  increaseCart,
  decreaseCart,
  clearCart,
} = require("../controllers/cartControllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/:book_id", validateToken, increaseCart);
router.put("/:book_id", validateToken, decreaseCart);
router.delete("/clearCart", validateToken, clearCart);

module.exports = router;
