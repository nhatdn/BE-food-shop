const config = require("../../../configs/configs");

function account_user({
  _id,
  username,
  role,
  email,
  fullname,
  cover,
  phone,
  avatar,
  status,
  gender,
  created_date,
  birthday,
}) {
  if (role === config.ADMIN) {
    return {
      _id,
      username,
      role,
      email,
      fullname,
      cover,
      phone,
      avatar,
      status,
      gender,
      created_date,
      birthday,
    };
  } else
    return {
      _id,
      username,
      email,
      fullname,
      cover,
      phone,
      avatar,
      status,
      gender,
      birthday,
    };
}

function create_access_token({ _id, username, role }) {
  return global.jwtr.sign({ _id, username, role }, config.TOKEN_SECRET, {
    expiresIn: config.EXPIRES_IN_ACCESS_TOKEN,
  });
}

function create_refresh_token({ _id }) {
  return global.jwtr.sign({ _id }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.EXPIRES_IN_REFRESH_TOKEN,
  });
}
function destroy_token(token) {
  global.jwtr.destroy(token)
}

module.exports = {
  account_user,
  create_access_token,
  create_refresh_token,
  destroy_token,
};
