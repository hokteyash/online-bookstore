const express = require("express");
const validateToken = require("../middlewares/validateToken");
const {
  allOrders,
  orderDetails,
  createOrder,
  adminViewAllOrders,
  updateOrderStatus,
  paymentHappening,
} = require("../controllers/orderControllers");
const { isAdmin } = require("../middlewares/isAdmin");
const router = express.Router();

// user routes
router.get("/orders/", validateToken, allOrders); // user's all past orders
router.get("/orders/:id", validateToken, orderDetails); // get one order with items
router.post("/orders/", validateToken, createOrder); // place order from cart
router.post("/orders/pay/:id", validateToken, paymentHappening); // pay for order

// admin routes
router.get("/admin/orders/", validateToken, isAdmin, adminViewAllOrders); // admin can view all orders of everyone with filters
router.put("/admin/orders/:id", validateToken, isAdmin, updateOrderStatus); // admin can update order status (e.g: Shipped, Delivered)
// Body: { order_status: "shipped" } for the above route

module.exports = router;
