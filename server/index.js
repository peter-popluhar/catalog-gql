const fs = require("fs");
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolver";

require("dotenv").config();

const typeDefs = gql(
  fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);

const { MONGODB_URI } = process.env;

const server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  // try {
  //   await mongoose.connect(
  //     MONGODB_URI,
  //     { useNewUrlParser: true }
  //   );
  // } catch (err) {
  //   console.log(err);
  // }

  app.get("/", (req, res) => res.send("Hello world"));

  app.listen({ port: 4001 }, () => {
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
  });
};

server();
