const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const userGet = require("./functions/User/userGet");

mongoose.connect(process.env.ATLAS || "mongodb://localhost/girasol", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resolvers = {
  Object: {
    __resolveType(object, context, info) {
      return "Word";
    },
  },
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let token = req.headers.authorization || "";
    token = token.replace("Bearer ", "");
    const user = await userGet(token);
    return { user };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
