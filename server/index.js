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
  let isDBConnected = false;
  let dbCollection = {};

  try {
    const client = await clientPromise;
    const db = await client.db(MONGODB_DB);
    dbCollection = await db.collection(MONGO_DB_COLLECTION);
    isDBConnected = true;
  } catch (e) {
    console.log(e);
    isDBConnected = false;
  }

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ dbCollection }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (req, res) => res.send("Hello world"));

  app.listen({ port: 4001 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4001${server.graphqlPath}`
    );
    console.log(`👉 Database is connected: ${isDBConnected}`);
  });
};

server();
