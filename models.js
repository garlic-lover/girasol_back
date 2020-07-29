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

module.exports = {
  user: User,
  word: Word,
  tag: Tag,
  list: List,
};
