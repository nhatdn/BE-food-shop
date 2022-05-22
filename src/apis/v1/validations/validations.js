var validator = require("validator");

const isEmail = (req, res, next) => {
  if (req.email == undefined) {
    return next();
  }
  if (validator.isEmail(req.email)) {
    next();
  } else {
    res.json({ fail: "fail" });
  }
};

module.exports = {
  isEmail,
};
