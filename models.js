const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstName: {
    type: String,
    default: "",
  },
  stripeData: {
    type: Object,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    default: "",
  },
  address: {
    type: Object,
    default: {},
  },
  billingAddress: { type: Object, default: {} },
  signinDate: {
    type: Date,
    default: "",
  },
  lastLogin: {
    type: Date,
    default: "",
  },
  myLanguage: {
    type: String,
    default: "es",
  },
  learnedLanguage: {
    type: String,
    default: "fr",
  },
  hash: {
    type: String,
    default: "",
  },
  salt: {
    type: String,
  },
  token: {
    type: String,
    default: "",
  },
  courseName: {
    type: String,
  },
  isProf: {
    type: Boolean,
  },
  exercices: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercice" }],
    default: [],
  },
  pendingStudents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    default: [],
  },
  students: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    default: [],
  },
  courses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    default: [],
  },
});

const Word = mongoose.model("Word", {
  lang: {
    type: String,
  },
  type: {
    type: String,
  },
  gender: {
    type: String,
  },
  value: {
    type: String,
  },
  firstLetter: {
    type: String,
  },
  trads: {
    type: Object,
    default: {},
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
});

const Tag = mongoose.model("Tag", {
  name: { type: String },
  lang: { type: String },
});

const List = mongoose.model("List", {
  words: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }],
  },
});

const Exercice = mongoose.model("Exercice", {
  type: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: Object,
  },
});

const Course = mongoose.model("Course", {
  name: { type: String, default: "My awesome course" },
  studentName: { type: String, default: "pending" },
  professorName: { type: String, default: "" },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  code: {
    type: String,
  },
  liveExercice : {ex : { type: mongoose.Schema.Types.ObjectId, ref: "Exercice" }, 
  isOn: {type : Boolean, default : false}}
});

module.exports = {
  user: User,
  word: Word,
  tag: Tag,
  list: List,
  exercice: Exercice,
  course: Course,
};
