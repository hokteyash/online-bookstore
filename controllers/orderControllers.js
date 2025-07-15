const Order = require("../models/order");
const OrderItem = require("../models/orderItem");

const allOrders = async (req, res) => {};

const orderDetails = async (req, res) => {};

const createOrder = async (req, res) => {};

const adminViewAllOrders = async (req, res) => {};

const updateOrderStatus = async (req, res) => {};

const paymentHappening = async (req, res) => {
    // after payment completed, when we are updating in Order payment paid,
    // so post will store each book of that order in "orderItem" table
};

module.exports = {
  allOrders,
  orderDetails,
  createOrder,
  adminViewAllOrders,
  updateOrderStatus,
  paymentHappening,
};
