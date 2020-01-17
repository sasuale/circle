const { createProduct, getProducts, getProductsByProductId, updateProduct, deleteProduct, getProductsByProductName } = require("../controllers/produto.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createProduct);
router.get("/", checkToken, getProducts);
router.get("/:id", checkToken, getProductsByProductId);
router.patch("/:id", checkToken, updateProduct);
router.delete("/:id", checkToken, deleteProduct);
router.get("/single_product/:nome", checkToken, getProductsByProductName);

module.exports = router;