const models = require("../../models");
const Word = models.word;

const wordFormat = require("./wordFormat");

const wordAdd = async (word) => {
  try {
    // Add the first letter
    let { firstLetter, formatedWord } = wordFormat(word.value);
    word.firstLetter = firstLetter;
    word.value = formatedWord;
    // Format the trad
    let formatedTrads = [];
    for (let i = 0; i < word.trads.value.length; i++) {
      let { formatedWord } = wordFormat(word.trads.value[i]);
      formatedTrads.push(formatedWord);
    }
    word.trads = { [word.trads.lang]: formatedTrads };

    await new Word(word).save();
    return "victory";
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = wordAdd;
