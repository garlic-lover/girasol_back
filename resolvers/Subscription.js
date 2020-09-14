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

const liveLinkedPropsGet = {
  subscribe: withFilter(
    () => {
      const asyncIterator = pubsub.asyncIterator("linkedPropsChanged");
      return asyncIterator;
    },
    (payload, variables) => {
      return payload.course_id === variables.course_id;
    }
  ),
};

const liveMathGet = {
  subscribe: withFilter(
    () => {
      const asyncIterator = pubsub.asyncIterator("liveMathChanged");
      return asyncIterator;
    },
    (payload, variables) => {
      return payload.course_id === variables.course_id;
    }
  ),
};

module.exports = {
  liveExerciceGet,
  liveHoleTextGet,
  liveLinkedPropsGet,
  liveMathGet,
};
