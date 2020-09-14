const pubsub = require("../pubSub");
const models = require("../models");

const signinFunction = require("../functions/User/signin");
const loginFunction = require("../functions/User/login");
const studentCreateFunction = require("../functions/Student/studentCreate");
const tagAddFunction = require("../functions/WordsManagement/tagAdd");
const wordAddFunction = require("../functions/WordsManagement/wordAdd");
const holeTextAddFunction = require("../functions/Exercices/HoleTextAdd");
const linkedPropsAddFunction = require("../functions/Exercices/LinkedPropsAdd");
const liveExerciceChangeFunction = require("../functions/Exercices/LiveExChange");
const liveHoleEx = require("../functions/Exercices/liveHoleEx");
const liveLinkedEx = require("../functions/Exercices/liveLinkedEx");

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

const studentDelete = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let course = await models.course.findById(args._id);
    if (course) {
      let theIndex = context.user.students.indexOf(args._id);
      if (theIndex !== -1) {
        let newTab = [...context.user.students];
        newTab.splice(theIndex, 1);
        context.user.students = newTab;
        /* 
          Important !!! 
          Delete the course from the student's model too
        */
      }
      let theIndexBis = context.user.pendingStudents.indexOf(args._id);
      if (theIndexBis !== -1) {
        let newTab = [...context.user.pendingStudents];
        newTab.splice(theIndexBis, 1);
        context.user.pendingStudents = newTab;
      }
      await Promise.all([course.remove(), context.user.save()]);
      return "deleted";
    }
    return "fail";
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

const exDelete = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let theEx = await models.exercice.findById(args._id);
    if (theEx) {
      let theIndex = context.user.exercices.indexOf(args._id);
      let newTab = [...context.user.exercices];
      newTab.splice(theIndex, 1);
      context.user.exercices = newTab;
      await Promise.all([theEx.remove(), context.user.save()]);
      return "victory";
    }
    return "fail";
  }
  return "You have to be connected to add a student";
};

const holeTextAdd = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let isAdded = await holeTextAddFunction(args, context.user);
    return isAdded;
  }
  return "You have to be connected to create an exercice";
};

const linkedPropsAdd = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let isAdded = await linkedPropsAddFunction(args, context.user);
    return isAdded;
  }
  return "You have to be connected to create an exercice";
};

const liveExerciceChange = async (parent, args) => {
  try {
    let res = await liveExerciceChangeFunction(args);
    if (res === "victory") {
      pubsub.publish("liveExerciceChanged", {
        course_id: args.course_id,
        liveExerciceGet: {
          ex_id: args.ex_id,
          isOn: args.isOn,
          type: args.type,
          mathLive: args.mathLive,
        },
      });

      return "victory";
    }
    return "error";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const liveHoleTextRespond = async (parent, args) => {
  // let res = await liveHoleEx(args.course_id, args.holes);
  console.log(args.holes);
  pubsub.publish("holeTextChanged", {
    course_id: args.course_id,
    liveHoleTextGet: {
      holes: args.holes,
    },
  });
  return "victory";
  /* if (res.status === "victory") {
    pubsub.publish("holeTextChanged", {
      holeTextGet: {
        holes: res.holes,
      },
    });
    return "victory";
  } else {
    return "error";
  } */
};

const liveLinkedPropsRespond = async (parent, args) => {
  console.log("args", args);
  let isSaved = await liveLinkedEx(
    args.course_id,
    args.theWordsLeft,
    args.theWordsRight,
    args.links
  );
  pubsub.publish("linkedPropsChanged", {
    course_id: args.course_id,
    liveLinkedPropsGet: {
      theWordsLeft: isSaved.theWordsLeft,
      theWordsRight: isSaved.theWordsRight,
      links: isSaved.links,
    },
  });
  return "victory";
};

const liveMathChange = async (parent, args) => {
  let theCourse = await models.course.findById(args.course_id);
  if (theCourse) {
    theCourse.liveMath = args.string;
    console.log(theCourse);
    await theCourse.save();
  }
  pubsub.publish("liveMathChanged", {
    course_id: args.course_id,
    liveMathGet: args.string,
  });
  return "victory";
};

module.exports = {
  signin,
  login,
  profileUpdate,
  tagAdd,
  wordAdd,
  holeTextAdd,
  linkedPropsAdd,
  studentCreate,
  liveExerciceChange,
  liveHoleTextRespond,
  liveLinkedPropsRespond,
  liveMathChange,
  studentDelete,
  exDelete,
};
