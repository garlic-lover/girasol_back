const models = require("../../models");
const Course = models.course;

const liveExChange = async (params) => {
  try {
    let { course_id, ex_id, isOn } = params;
    let theCourse = await Course.findById(course_id);
    theCourse.liveExercice = { ex: ex_id, isOn: isOn };
    await theCourse.save();
    return "victory";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = liveExChange;
