const { createUser, getUsers, getUserByUserId, getUserByUserUsername, updateUser, deleteUser, login } = require("../controllers/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.get("/single_user/:utilizador", checkToken, getUserByUserUsername);
router.patch("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;