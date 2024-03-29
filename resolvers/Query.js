const models = require("../models");

const connect = async (parent, args, context) => {
  try {
    if (context.user !== "user not found") {
      context.user.connectedStatus = true;
      let user;
      if (context.user.isProf === false) {
        user = await models.user.findById(context.user._id).populate("courses");
      } else {
        user = await models.user
          .findById(context.user._id)
          .populate("students");
      }
      return user;
    } else {
      return { connectedStatus: false };
    }
  } catch (error) {
    console.log(error);
  }
};

const studentsGet = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let array = context.user.pendingStudents;
    array = array.concat(context.user.students);
    console.log(array);
    // let user = await (await models.user.findById(context.user._id)).populate("pendingStudents");
    let students = await models.course.find({
      _id: { $in: array },
    });

    console.log(students);
    return students;
  } else {
    return [];
  }
};

const tagsGet = async (parent, args) => {
  try {
    let tags;
    if (args.lang) {
      tags = await models.tag.find({ lang: args.lang });
    } else {
      tags = await models.tag.find();
    }
    return tags;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const wordsGet = async (parent, args) => {
  try {
    let words;
    if (args.lang) {
      if (args.tag._id) {
        words = await models.word.find({ lang: args.lang, tags: args.tag });
      } else {
        words = await models.word.find({ lang: args.lang });
      }
    } else {
      words = await models.word.find();
    }
    return words;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const exercicesGet = async (parent, args, context) => {
  if (context.user !== "user not found") {
    let theUser = await models.user
      .findById(context.user._id)
      .populate("exercices");
    return theUser.exercices;
  }
  return [];
};

const holeTextGet = async (parent, args) => {
  try {
    let Ex = await models.exercice.findById(args.ex_id);
    if (Ex) {
      return {
        title: Ex.title,
        description: Ex.description,
        parsedText: Ex.content.parsedText,
        holes: Ex.content.holes,
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const linkedPropsGet = async (parent, args) => {
  try {
    let Ex = await models.exercice.findById(args.ex_id);
    if (Ex) {
      return {
        title: Ex.title,
        description: Ex.description,
        words: Ex.content.words,
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const randomedLinkedPropsGet = async (parent, args) => {
  try {
    let Course = await (await models.course.findById(args.course_id))
      .populate({
        path: "liveExercice.ex",
        model: "Exercice",
      })
      .execPopulate();
    if (Course) {
      console.log(Course);
      return {
        title: Course.liveExercice.ex.title,
        description: Course.liveExercice.ex.description,
        theWordsLeft: Course.liveExercice.responses.theWordsLeft,
        theWordsRight: Course.liveExercice.responses.theWordsRight,
        links: Course.liveExercice.responses.links,
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const courseGet = async (parent, args) => {
  try {
    let course = await models.course.findById(args._id);
    return course;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  connect,
  tagsGet,
  wordsGet,
  exercicesGet,
  studentsGet,
  holeTextGet,
  linkedPropsGet,
  courseGet,
  randomedLinkedPropsGet,
};
