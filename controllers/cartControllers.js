const Cart = require("../models/cart");
const Book = require("../models/book");

const getCart = async (req, res) => {
  const user_id = req.user.id;
  try {
    const cartItems = await Cart.find({ user_id }).populate("book_id");
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price_at_addition,
      0
    );
    return res.status(200).json({ total: totalPrice, cartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const increaseCart = async (req, res) => {
  const user_id = req.user.id;
  const book_id = req.params.book_id;

  try {
    let cart = await Cart.findOne({ user_id, book_id });
    if (!cart) {
      const book = await Book.findById(book_id);
      if (!book) return res.status(404).json({ message: "Book not found" });
      cart = await Cart.create({
        user_id,
        book_id,
        price_at_addition: book.price,
      });
    } else {
      cart.quantity++;
      await cart.save();
    }
    return res.status(200).json({ message: "Added element to the cart", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const decreaseCart = async (req, res) => {
  const user_id = req.user.id;
  const book_id = req.params.book_id;

  try {
    let cart = await Cart.findOne({ user_id, book_id });
    if (!cart) return res.status(404).json({ message: "Cart item not found" });
    cart.quantity--;
    if (cart.quantity <= 0) {
      await Cart.deleteOne({ user_id, book_id });
    } else {
      await cart.save();
    }
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const result = await Cart.deleteMany({ user_id: req.user.id });
    return res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} items from the cart.` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCart,
  increaseCart,
  decreaseCart,
  clearCart,
};
