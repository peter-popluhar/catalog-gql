import http from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { resolvers } from "./../resolver";
import { typeDefs } from "./../typeDefs";
import clientPromise from "./../utils/mongodb";
import cors from "cors";

require("dotenv").config();

const { MONGODB_DB, MONGO_DB_COLLECTION, TOKEN } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  let isDBConnected = false;
  let dbCollection = {};

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: process.env.NODE_ENV !== "production",
    context: ({ req }) => {
      // @FIXME
      // const token = req.headers.authorization;
      // if (token !== TOKEN) throw new AuthorizationError("you must be logged in");

      return { dbCollection };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  try {
    const client = await clientPromise;
    const db = await client.db(MONGODB_DB);
    dbCollection = await db.collection(MONGO_DB_COLLECTION);
    isDBConnected = true;
  } catch (e) {
    console.log(e);
    isDBConnected = false;
  }

  //   app.get("/", (req, res) => res.send("Hello world"));
  console.log(`👉 Database is connected: ${isDBConnected}`);
};

startApolloServer(app, httpServer);

export default httpServer;
