const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  getAllCategory,
  addCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const validateToken = require("../middlewares/validateToken");
const router = express.Router();

router.get("/", validateToken, isAdmin, getAllCategory);
router.post("/", validateToken, isAdmin, addCategories);
router.put("/:id", validateToken, isAdmin, updateCategory);
router.delete("/:id", validateToken, isAdmin, deleteCategory);

module.exports = router;
