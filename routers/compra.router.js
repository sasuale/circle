const { createBuy, getShopping, getShoppingByBuyId, updateBuy, deleteBuy } = require("../controllers/compra.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createBuy);
router.get("/", checkToken, getShopping);
router.get("/:id", checkToken, getShoppingByBuyId);
router.patch("/:id", checkToken, updateBuy);
router.delete("/:id", checkToken, deleteBuy);

module.exports = router;