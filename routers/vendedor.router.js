const { createSeller, getSellers, getSellersBySellerId, updateSeller, deleteSeller } = require("../controllers/vendedor.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createSeller);
router.get("/", checkToken, getSellers);
router.get("/:id", checkToken, getSellersBySellerId);
router.patch("/:id", checkToken, updateSeller);
router.delete("/:id", checkToken, deleteSeller);

module.exports = router;