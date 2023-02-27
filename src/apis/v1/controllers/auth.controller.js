const asyncHandler = require("../helpers/asyncHandler");
const mongoose = require("mongoose");
const user = require("../models/user");
const config = require("../../../configs/configs");
const {
  account_user,
  create_access_token,
  create_refresh_token,
} = require("../helpers/authorization");
const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    var account = await user
    .findOne({
      $or: [{ username }, { email }],
      password,
    })
    .lean();
    if (account) {
      res.status(200).json({
        data: account_user(account),
        access_token: create_access_token(account),
        refresh_token: create_refresh_token(account),
      });
    } else {
      res.status(200).json({
        content: "Your username or password is incorrect, please login again.",
      });
    }
  } catch {
    res.status(200).json({
      content: "Cant verification this account",
    });
  }
  
});

module.exports = {
  login,
};
