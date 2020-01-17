const { createRole, getRoles, getRoleByRoleId, updateRole, deleteRole, getRoleByRoleName } = require("../controllers/role.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createRole);
router.get("/", checkToken, getRoles);
router.get("/:id", checkToken, getRoleByRoleId);
router.patch("/:id", checkToken, updateRole);
router.delete("/:id", checkToken, deleteRole);
router.get("/single_role/:nome", checkToken, getRoleByRoleName);

module.exports = router;