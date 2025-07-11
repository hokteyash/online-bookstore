const express = require("express");
const { validateToken } = require("../middlewares/validateToken");
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
const router = express.Router();

// public routes
router.get("/", getAllBooks);
router.get("/:id", getIndividualBook);
router.get("/:category_id", getBooksByCategory);
router.get("/search", searchBook);

// protected routes for admin
router.post("/", validateToken, isAdmin, addBooks);
router.put("/:id", validateToken, isAdmin, updateBook);
router.delete("/:id", validateToken, isAdmin, deleteBook);

module.exports = router;
