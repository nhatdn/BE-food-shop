const duration = 1000 * 60;
const { usersNotAuth } = require("../models/users");
const awaitDeleteAccount = function (email) {
  setTimeout(async () => {
    console.log("del");
    await usersNotAuth.findOneAndRemove({ email });
  }, duration);
};

module.exports = awaitDeleteAccount;