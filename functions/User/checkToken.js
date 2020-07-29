const models = require("../models");

const User = models.user;

const checkToken = async (context) => {
  const token = context.request.get("Authorization");
  if (token) {
    const user = await User.findOne({
      token: token,
    });
    if (user) {
      return user;
    } else {
      return "user not found";
    }
  } else {
    throw new Error("Not authenticated");
  }
};

module.exports = checkToken;
