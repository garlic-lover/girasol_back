const pubsub = require("../pubSub");

const liveExerciceGet = {
  subscribe: () => {
    const asyncIterator = pubsub.asyncIterator("liveExerciceChanged");
    return asyncIterator;
  },
};

const liveHoleTextGet = {
  subscribe: () => {
    const asyncIterator = pubsub.asyncIterator("holeTextChanged");
    return asyncIterator;
  },
};

module.exports = { liveExerciceGet, liveHoleTextGet };
