const models = require("../../models");
const Course = models.course;

const liveExChange = async (params) => {
  try {
    let { course_id, ex_id, isOn, mathLive } = params;
    let theCourse = await Course.findById(course_id);
    if (ex_id) {
      theCourse.liveExercice.ex = ex_id;
    }
    if (isOn) {
      theCourse.liveExercice.isOn = isOn;
    }
    if (mathLive) {
      theCourse.liveExercice.mathLive = mathLive;
    }

    await theCourse.save();
    return "victory";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = liveExChange;
