const wordFormat = (word) => {
  let firstLetter = word.split("")[0].toUpperCase();
  // Format the word
  let formatedWord = word.toLowerCase().split("");
  formatedWord.splice(0, 1, firstLetter);
  formatedWord = formatedWord.join("");
  return { firstLetter, formatedWord };
};

module.exports = wordFormat;
