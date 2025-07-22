const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Cart = require("../models/cart");

const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const orderDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id)
      .populate("orderItems")
      .populate("user");
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  const { shipping_address, total_price } = req.body;
  try {
    const order = await Order.create({
      user_id: req.user.id,
      shipping_address,
      total_price,
    });
    res.status(200).json({ message: "Order created without payment", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminViewAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { order_status } = req.body;
  try {
    const updateFields = { order_status }; // dynamic object
    if (order_status === "shipped") updateFields.shippedAt = new Date();
    if (order_status === "delivered") updateFields.deliveredAt = new Date();

    const order = await Order.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json({
      message: "Updated order status to shipped or etc.",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const paymentHappening = async (req, res) => {
  // after payment completed, when we are updating in Order payment paid,
  // so post will store each book of that order in "orderItem" table
  const id = req.params.id;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { payment_status: "paid", paidAt: new Date() },
      { new: true }
    );
    const cartItems = await Cart.find({ user_id: req.user.id });
    const orderItems = cartItems.map((item) => {
      return {
        order_id: id,
        book_id: item.book_id,
        quantity: item.quantity,
        price_at_order_time: item.price_at_addition,
      };
    });
    const result = await OrderItem.insertMany(orderItems);
    res.status(200).json({
      message: "Hurray, Payment done and your order placed!!",
      order,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  allOrders,
  orderDetails,
  createOrder,
  adminViewAllOrders,
  updateOrderStatus,
  paymentHappening,
};
