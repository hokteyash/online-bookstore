const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    normalized_title: {
      type: String,
      index: true, // for faster search
    },
    description: {
      type: String,
      required: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    price: {
      type: Number,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rating: {
      type: Number,
    },
    no_of_pages: {
      type: Number,
      required: true,
    },
    publication_year: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    cover_image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
