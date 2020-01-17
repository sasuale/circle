const { createPayment, getPayments, getPaymentByPaymentId, getPaymentByPaymentType, updatePayment, deletePayment } = require("../controllers/pagamento.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createPayment);
router.get("/", checkToken, getPayments);
router.get("/:id", checkToken, getPaymentByPaymentId);
router.get("/payment_type/:tipo", checkToken, getPaymentByPaymentType);
router.patch("/:id", checkToken, updatePayment);
router.delete("/:id", checkToken, deletePayment);

module.exports = router;