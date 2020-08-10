const uid2 = require("uid2");

const models = require("../../models");
const Course = models.course;

async function studentCreate(user) {
  try {
    const code = uid2(6).toUpperCase();
    const newCourse = await new Course({
      name: user.courseName,
      professor: user._id,
      professorName: user.firstName + " " + user.lastName,
      code: code,
    }).save();
    user.pendingStudents.push(newCourse._id);
    await user.save();
    return code;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

module.exports = studentCreate;
