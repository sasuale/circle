const { createRolePermission, getRolesPermissions, getRolesPermissionsByRoleId, deleteRolePermission } = require("../controllers/role_permission.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createRolePermission);
router.get("/", checkToken, getRolesPermissions);
router.get("/:id", checkToken, getRolesPermissionsByRoleId);
router.delete("/:n_id/:p_id", checkToken, deleteRolePermission);

module.exports = router;