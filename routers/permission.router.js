const { createPermission, getPermissions, getPermissionByPermissionId, updatePermission, deletePermission, getPermissionByPermissionName } = require("../controllers/permission.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createPermission);
router.get("/", checkToken, getPermissions);
router.get("/:id", checkToken, getPermissionByPermissionId);
router.patch("/:id", checkToken, updatePermission);
router.delete("/:id", checkToken, deletePermission);
router.get("/single_permission/:nome", checkToken, getPermissionByPermissionName);

module.exports = router;