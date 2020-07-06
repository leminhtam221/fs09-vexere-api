const express = require("express");
const userController = require("./user.controller");
const {uploadImage} = require("../../../../middlewares/uploadImages");
const {authenticate} = require("../../../../middlewares/auth");
const {validatePostUser} = require("./../../../../middlewares/validation/users/postUser");

const router = express();

router.use(express.json());
router.post("/signup", validatePostUser, userController.createUser);
router.post("/login", userController.login);
router.post("/uploadAvatar", authenticate, uploadImage("avatar"), userController.uploadAvatar);

module.exports = router;
