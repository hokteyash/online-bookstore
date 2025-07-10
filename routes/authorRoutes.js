const express = require("express");
const { validateToken } = require("../middlewares/validateToken");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  getAllAuthors,
  addAuthors,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorControllers");
const router = express.Router();

router.get("/", validateToken, isAdmin, getAllAuthors);
router.post("/", validateToken, isAdmin, addAuthors);
router.put("/:id", validateToken, isAdmin, updateAuthor);
router.put("/:id", validateToken, isAdmin, deleteAuthor);

module.exports = router;
