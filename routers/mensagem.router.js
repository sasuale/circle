const { createMessage, getMessages, getMessageByEmitterId, updateMessage, deleteMessage } = require("../controllers/mensagem.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createMessage);
router.get("/", checkToken, getMessages);
router.get("/:id", checkToken, getMessageByEmitterId);
router.patch("/:id", checkToken, updateMessage);
router.delete("/:id", checkToken, deleteMessage);

module.exports = router;