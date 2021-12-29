const fs = require("fs");
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolver";
import clientPromise from "./utils/mongodb";

require("dotenv").config();

const typeDefs = gql(
  fs.readFileSync("./schema.graphql", { encoding: "utf-8" })
);

const { MONGODB_DB, MONGO_DB_COLLECTION } = process.env;

const server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  let isConnected;

  try {
    const client = await clientPromise
    isConnected = true;
  } catch(e) {
    console.log(e);
    isConnected = false;
  }

  app.get("/", (req, res) => res.send("Hello world"));

  app.listen({ port: 4001 }, () => {
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);  
    console.log(`👉 Database is connected: ${isConnected}`);  
  });
};

server();
