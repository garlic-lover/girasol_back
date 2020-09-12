const models = require("../../models");
const Course = models.course;

const liveLinkedEx = async (course_id, theWordsLeft, theWordsRight, links) => {
  let theCourse = await Course.findById(course_id);
  if (theWordsLeft) {
    theCourse.liveExercice.responses = {
      theWordsLeft: theWordsLeft,
      theWordsRight: theWordsRight,
      links: links,
    };
  } else {
    theCourse.liveExercice.responses = {
      links: links,
    };
  }

  await theCourse.save();
  return theCourse.liveExercice.responses;
};

module.exports = liveLinkedEx;
