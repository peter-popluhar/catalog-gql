import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolver";
import { typeDefs } from "./typeDefs";
require('dotenv').config();


const {MONGODB_URI} = process.env

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
      console.log("connected");
    });
  };
  
  server();
