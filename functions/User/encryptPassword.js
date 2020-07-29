const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const encryptPassword = (password) => {
  // Let's create a random token and salt
  const token = uid2(16);
  const salt = uid2(16);

  // Let's mix the passwword with the salt
  const hash = SHA256(password + salt).toString(encBase64);

  return { token, salt, hash };
};

module.exports = encryptPassword;
