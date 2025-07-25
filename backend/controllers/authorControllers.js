const Author = require("../models/author");
const Book = require("../models/book");
const { cleanTheString } = require("../utility/util");

const getAllAuthors = async (req, res) => {
  try {
    const author = await Author.find();
    return res.status(200).json({ author });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addAuthors = async (req, res) => {
  const authors = req.body;
  if (!Array.isArray(authors) || authors.length === 0) {
    return res.status(400).json({ message: "Invalid author data" });
  }
  const updatedAuthors = authors.map((author) => {
    const cleaned = cleanTheString(author?.name);
    return {
      ...author,
      normalize_name: cleaned,
    };
  });
  try {
    await Author.insertMany(updatedAuthors);
    return res.status(200).json({ message: "All Authors added successfully" }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuthor = async (req, res) => {
  const id = req.params.id;
  const author = req.body;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, author, {
      new: true,
    });
    return res.status(200).json({
      message: `Author updated successfully named ${updatedAuthor?.name}`,
      updatedAuthor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteAuthor = async (req, res) => {
  const id = req.params.id;
  try {
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found!!" });
    }
    await Book.updateMany(
      { author_id: id },
      {
        $set: {
          author_id: null,
        },
      }
    );
    return res
      .status(200)
      .json({ message: "Author deleted successfully", author });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  getAllAuthors,
  addAuthors,
  updateAuthor,
  deleteAuthor,
};
