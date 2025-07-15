const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
    index: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price_at_order_time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
