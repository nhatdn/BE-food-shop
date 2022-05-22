const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller");
const { isEmail } = require("../validations/validations");

router.post("/login", isEmail, login);

module.exports = router;
