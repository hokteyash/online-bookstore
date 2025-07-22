const Book = require("../models/book");
const { cleanTheString } = require("../utility/util");
const Author = require("../models/author")

const getAllBooks = async (req, res) => {
  try {
    const allBook = await Book.find();
    return res.status(200).json({ allBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getIndividualBook = async (req, res) => {
  const id = req.params.id;
  try {
    const bookDetail = await Book.findById(id);
    if (!bookDetail) {
      return res.status(404).json({ message: "Book not found!!" });
    }
    return res.status(200).json({ bookDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getBooksByCategory = async (req, res) => {
  const category_id = req.params.category_id;
  console.log(category_id);
  try {
    const allSearchedCategoryBook = await Book.find({ category_id });
    return res.status(200).json({ allSearchedCategoryBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const searchBook = async (req, res) => {
  const { query } = req.query;

  // Validate query
  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }

  // Normalize the query string
  const normalizedQuery = cleanTheString(query);

  try {
    // Find authors whose normalized name matches the query
    const matchingAuthors = await Author.find({
      normalize_name: {
        $regex: normalizedQuery,
        $options: "i",
      },
    });

    const authorIds = matchingAuthors.map((author) => author._id);

    // Find books where normalized title matches OR author is in matchingAuthors
    const books = await Book.find({
      $or: [
        { normalized_title: { $regex: normalizedQuery, $options: "i" } },
        { author_id: { $in: authorIds } },
      ],
    }).populate("author_id");

    return res.status(200).json(books);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Search failed" });
  }
};

const addBooks = async (req, res) => {
  const books = req.body;
  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: "Invalid book data" });
  }
  const updatedBooks = books.map((book) => {
    const cleaned = cleanTheString(book?.title);
    return {
      ...book,
      normalized_title: cleaned,
    };
  });
  try {
    // Two ways to add multiple data
    // await Promise.all(books.map(book => Book.create(book)));
    await Book.insertMany(updatedBooks);
    return res.status(200).json({ message: "All books added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const book = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, {
      new: true,
    });
    return res.status(200).json({
      message: `Book updated successfully named ${updatedBook?.title}`,
      updatedBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!!" });
    }
    return res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
module.exports = {
  getAllBooks,
  getIndividualBook,
  addBooks,
  updateBook,
  deleteBook,
  getBooksByCategory,
  searchBook,
};
