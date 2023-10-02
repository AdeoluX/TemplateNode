const express = require("express");
const UserController = require("../controller/user.controller");
const { verify } = require("../middleware/verifyToken");
const { validateReq } = require("../middleware/validate");
const { login, signUp } = require("../validations/auth.validations");
const router = express.Router();

router.get("/sign-in", validateReq(login), (new UserController()).getAllUser);

router.get("/sign-up", validateReq(signUp), (new UserController()).getAllUser);


module.exports = router;
