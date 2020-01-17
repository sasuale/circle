const { createImage, getImages, getImagesByImageId, updateImage, deleteImage } = require("../controllers/imagem.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/", checkToken, createImage);
router.get("/", checkToken, getImages);
router.get("/:id", checkToken, getImagesByImageId);
router.patch("/:id", checkToken, updateImage);
router.delete("/:id", checkToken, deleteImage);

module.exports = router;