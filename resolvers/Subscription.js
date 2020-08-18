const { withFilter } = require("apollo-server");
const pubsub = require("../pubSub");

const liveExerciceGet = {
  subscribe: withFilter(
    () => {
      const asyncIterator = pubsub.asyncIterator("liveExerciceChanged");
      return asyncIterator;
    },
    (payload, variables) => {
      return payload.course_id === variables.course_id;
    }
  ),
};

const liveHoleTextGet = {
  subscribe: withFilter(
    () => {
      const asyncIterator = pubsub.asyncIterator("holeTextChanged");
      return asyncIterator;
    },
    (payload, variables) => {
      return payload.course_id === variables.course_id;
    }
  ),
};

module.exports = { liveExerciceGet, liveHoleTextGet };
