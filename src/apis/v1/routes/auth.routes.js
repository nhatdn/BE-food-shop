const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth.controller");
const { isEmail } = require("../validations/validations");

router.post("/login", isEmail, login);
router.post("/register", isEmail, register);


module.exports = router;
