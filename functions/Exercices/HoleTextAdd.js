const models = require("../../models");
const Exercice = models.exercice;

const holeTextAdd = async (args, user) => {
  try {
    let ex = new Exercice({
      type: "holeText",
      title: args.title,
      description: args.description,
      content: {
        parsedText: args.parsedText,
        holes: args.holes,
      },
    });
    let exSaved = await ex.save();
    user.exercices.push(exSaved._id);
    await user.save();
    return "victory";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = holeTextAdd;
