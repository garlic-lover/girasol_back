const models = require("../models");

const userGet = require("../functions/User/userGet");

const get = async (parent, args, context, info) => {
  let get = "";
  if (get.status === "victory") {
    return get.list;
  } else {
    return "fail";
  }
};

const tokenConnect = async (parent, args) => {
  let user = await userGet(args.token);
  return user;
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
      words = await models.word.find({ lang: args.lang });
    } else {
      words = await models.word.find();
    }
    return words;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  get,
  tokenConnect,
  tagsGet,
  wordsGet,
};
