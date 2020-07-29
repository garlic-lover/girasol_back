const models = require("../../models");

const User = models.user;

const userGet = async (token) => {
  const user = await User.findOne({
    token: token,
  });
  if (user) {
    return user;
  } else {
    return "user not found";
  }
};

module.exports = userGet;
