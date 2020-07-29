const models = require("../../models");
const Tag = models.tag;

const tagAdd = async (tags) => {
  try {
    for (let i = 0; i < tags.length; i++) {
      await new Tag(tags[i]).save();
    }
    let tagList = await Tag.find();
    return tagList;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = tagAdd;
