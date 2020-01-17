const { createCategory, getCategories, getCategoriesByCategoryId, updateCategory, deleteCategory, getCategoriesByCategoryName } = require("../controllers/categoria.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createCategory);
router.get("/", checkToken, getCategories);
router.get("/:id", checkToken, getCategoriesByCategoryId);
router.patch("/:id", checkToken, updateCategory);
router.delete("/:id", checkToken, deleteCategory);
router.get("/single_category/:nome", checkToken, getCategoriesByCategoryName);

module.exports = router;