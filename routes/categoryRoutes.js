const express = require("express");
const { validateToken } = require("../middlewares/validateToken");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  getAllCategory,
  addCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const router = express.Router();

router.get("/", validateToken, isAdmin, getAllCategory);
router.post("/", validateToken, isAdmin, addCategories);
router.put("/:id", validateToken, isAdmin, updateCategory);
router.put("/:id", validateToken, isAdmin, deleteCategory);

module.exports = router;
