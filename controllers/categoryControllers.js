const Category = require("../models/category");
const Book = require("../models/book");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategories = async (req, res) => {
  const categories = req.body;
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ message: "Invalid category data" });
  }
  try {
    await Category.insertMany(categories);
    return res
      .status(200)
      .json({ message: "All categories added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const category = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, category, {
      new: true,
    });
    return res.status(200).json({
      message: `category updated successfully named ${updateCategory?.name}`,
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found!!" });
    }
    await Book.updateMany(
      { category_id: id },
      {
        $set: {
          category_id: null,
        },
      }
    );
    return res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  getAllCategory,
  addCategories,
  updateCategory,
  deleteCategory,
};
