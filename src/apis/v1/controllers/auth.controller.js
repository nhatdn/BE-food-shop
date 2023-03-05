const asyncHandler = require("../helpers/asyncHandler");
const mongoose = require("mongoose");
const { users, usersNotAuth } = require("../models/users");
const config = require("../../../configs/configs");
const verifyMail = require("../utils/verifyEmail");
const awaitDeleteAccount = require("../utils/queueDeleteAccount");
const {
  account_user,
  create_access_token,
  create_refresh_token,
} = require("../helpers/authorization");
const login = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    var account = await users
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

const register = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, email, gender, created_date, status, fullname, phone, birthday } = req.body;
    let account = await users.findOne({ $or: [{username, phone, email}]}).lean();
    if(account) {
      let error = ((account.username == username && "Username") || (account.email == email && "Email ") && (account.phone == phone || "Phone"))  + " existed";
      res.status(401).json({
        code : 401,
        error,
      })
    } else {
      let account = new usersNotAuth({
        username, 
        password, 
        email, 
        gender, 
        created_date, 
        status, 
        fullname, 
        phone, 
        birthday
      })
      await account.save();
      verifyMail(email).then(() => {
        awaitDeleteAccount(email);
        return res.status(200).json({
          code: 200, 
          status: "OK", 
          content: "Please check your mail for verification"
        });
      }).catch(() => {
        res.status(200).json({
          code : 500,
          status: "Fail",
          content: "Error: Something went wrong! Please ensure all fields are in the right format!"
        });
      })
    }
  } catch(error) {
    console.log(error)
    if (error.isJoi === true) {
      return next(createError.BadRequest("Invalid Email/Password"));
    } else {
      res.status(500).json({
        content: "Cant register this account",
        error
      });
    }
  }
})

module.exports = {
  login,
  register
};
