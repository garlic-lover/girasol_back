const encryptPassword = require("./encryptPassword");
const signinCheck = require("./signinCheck");
const stripe = require("../Stripe/stripeFunctions");

const models = require("../../models");
const User = models.user;
const Course = models.course;

const signinFunction = async (params) => {
  try {
    // Check the data sent on the server
    let check = signinCheck(params);
    if (check !== "") {
      console.log(check);
      return { status: "fail", error: check };
    }

    // Check if the email address doesn't already exist
    let emailCheck = await User.find({ email: params.email });
    console.log(emailCheck);
    if (emailCheck.length !== 0) {
      return { status: "fail", error: "The email address already exists" };
    }
    // Use the crypt function
    const { token, salt, hash } = encryptPassword(params.password);

    // Get current date
    const today = new Date();

    const userData = {
      firstName: params.firstName,
      lastName: params.lastName,
      dateOfBirth: params.dateOfBirth,
      email: params.email,
      signinDate: today,
      myLanguage: params.myLanguage,
      learnedLanguage: params.learnedLanguage,
      courseName: params.courseName,
      isProf: params.isProf,
      lastLogin: today,
      token: token,
      salt: salt,
      hash: hash,
    };
    let course;
    if (params.code !== "") {
      course = await Course.findOne({ code: params.code });
      if (course) {
        userData.courses = [course._id];
      }
    }

    if (process.env.STRIPE_ACTIVATE === true) {
      const stripeData = await stripe.accountCreate(userData);
      userData.stripeData = stripeData;
    }
    const user = await new User(userData).save();
    if (course && course._id) {
      let professor = await User.findOne({ pendingStudents: course._id });
      let theIndex = professor.pendingStudents.indexOf(params.code);
      professor.pendingStudents.splice(theIndex, 1);
      professor.students.push(course._id);
      course.studentName = user.firstName + " " + user.lastName;
      await Promise.all([professor.save(), course.save()]);
    }

    return {
      status: "victory",
      user,
      token: token,
    };
  } catch (error) {
    console.log(error);
    return { status: "fail", error: error };
  }
};

module.exports = signinFunction;
