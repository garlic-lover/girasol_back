const signinFunction = require("../functions/User/signin");
const loginFunction = require("../functions/User/login");
const studentCreateFunction = require("../functions/Student/studentCreate");
const tagAddFunction = require("../functions/WordsManagement/tagAdd");
const wordAddFunction = require("../functions/WordsManagement/wordAdd");
const holeTextAddFunction = require("../functions/Exercices/HoleTextAdd");

const signin = async (parent, args) => {
  let hasSignedIn = await signinFunction(args);
  if (hasSignedIn.status === "victory") {
    return {
      status: "victory",
      token: hasSignedIn.token,
      user: hasSignedIn.user,
    };
  } else {
    console.log("Mauvaises entrées sur le serveur");
    return { status: hasSignedIn.error };
  }
};

const login = async (parent, args) => {
  let isLoggedIn = await loginFunction(args);
  console.log(isLoggedIn);
  if (isLoggedIn.status === "victory") {
    let toReturnUser = isLoggedIn.user;
    /* if (isLoggedIn.user.stripeData.invoice_settings.default_payment_method) {
      let card = await stripe.cardGet(isLoggedIn.user.stripeData.id);
      if (card !== "error") {
        toReturnUser.cardData = card;
      }
    } */

    return { status: "victory", token: isLoggedIn.token, user: toReturnUser };
  } else {
    return { status: isLoggedIn.status };
  }
};

const profileUpdate = async (parent, args, context) => {
  let user = await checkToken(context);
  let modified = await profileUpdateFunction(args, user._id);
  if (modified.status === "victory") {
    return { token: modified.user.token, user: modified.user };
  } else {
    console.log("Mauvaises entrées sur le serveur");
    return { token: "User not modified" };
  }
};

const studentCreate = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let code = await studentCreateFunction(context.user);
    return code;
  }
  return "You have to be connected to add a student";
};

const tagAdd = async (parent, args) => {
  let areAdded = await tagAddFunction(args.tags);
  if (areAdded === "error") {
    return [];
  }
  return areAdded;
};

const wordAdd = async (parent, args) => {
  let isAdded = await wordAddFunction(args.word);
  return isAdded;
};

const holeTextAdd = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let isAdded = await holeTextAddFunction(args, context.user);
    return isAdded;
  }
  return "You have to be connected to create an exercice";
};

module.exports = {
  signin,
  login,
  profileUpdate,
  tagAdd,
  wordAdd,
  holeTextAdd,
  studentCreate,
};
