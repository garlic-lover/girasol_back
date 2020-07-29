const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const models = require("../../models");

const User = models.user;

const loginFunction = async ({ email, password }) => {
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return { status: "fail", error: "user not found" };
    }
    const salt = user.salt;
    const realHash = user.hash;

    // Let's mix the password with the salt
    const hash = SHA256(password + salt).toString(encBase64);

    if (hash !== realHash) {
      return { status: "fail", error: "bad password" };
    }

    return {
      status: "victory",
      token: user.token,
      user,
    };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = loginFunction;
