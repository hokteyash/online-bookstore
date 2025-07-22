const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  getAllBooks,
  getIndividualBook,
  addBooks,
  updateBook,
  deleteBook,
  getBooksByCategory,
  searchBook,
} = require("../controllers/bookControllers");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

// public routes
router.get("/", getAllBooks);
router.get("/search", searchBook);
router.get("/:id", getIndividualBook);
router.get("/searchBookByCategory/:category_id", getBooksByCategory);

// protected routes for admin
router.post("/", validateToken, isAdmin, addBooks);
router.put("/:id", validateToken, isAdmin, updateBook);
router.delete("/:id", validateToken, isAdmin, deleteBook);

module.exports = router;
