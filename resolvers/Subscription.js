const pubsub = require("../index");

const holeTextResponse = {
  subscribe: () => pubsub.asyncIterator("responseAdded"),
};

module.exports = { holeTextResponse };
