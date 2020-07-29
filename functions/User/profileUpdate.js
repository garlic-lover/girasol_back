const encryptPassword = require("./encryptPassword");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const models = require("../models");
const User = models.user;

const profileUpdate = async (args, _id) => {
  try {
    let user = await User.findById(_id);
    if (user) {
      // Check the password
      const salt = user.salt;
      const realHash = user.hash;

      // Let's mix the password with the salt
      const hash = SHA256(args.currentPassword + salt).toString(encBase64);

      if (hash !== realHash) {
        return { status: "fail", error: "bad password" };
      }

      // Then, manage the non sensible informations
      if (args.firstName) {
        user.firstName = args.firstName;
      }
      if (args.lastName) {
        user.lastName = args.lastName;
      }
      if (args.dateOfBirth) {
        user.dateOfBirth = args.dateOfBirth;
      }

      // Then, let's manage the password
      if (args.password) {
        // Use the crypt function
        const { token, salt, hash } = encryptPassword(args.password);
        user.token = token;
        user.salt = salt;
        user.hash = hash;
      }
      let savedUser = await user.save();
      return { status: "victory", user: savedUser };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = profileUpdate;
