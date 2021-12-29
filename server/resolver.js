import { ObjectId } from "mongodb";
import clientPromise from "./utils/mongodb";
require("dotenv").config();

const { MONGODB_DB, MONGO_DB_COLLECTION } = process.env;

export const resolvers = {
  Query: {
    GetItems: async () => {
      let items;

      try {
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);

        items = await db
          .collection(MONGO_DB_COLLECTION)
          .find({})
          .sort({ _id: -1 })
          .toArray();
      } catch (e) {
        console.log(e);
      }

      return JSON.parse(JSON.stringify(items));
    },

    GetItem: async (_, { id }) => {
      let item;

      try {
        const objectId = await ObjectId(id);
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);

        item = await db
          .collection(MONGO_DB_COLLECTION)
          .findOne({ _id: objectId });
      } catch (e) {
        console.log(e);
      }

      return JSON.parse(JSON.stringify(item));
    },
  },

  Mutation: {
    CreateItem: async (
      _,
      {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      }
    ) => {
      const item = {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      };

      try {
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);
        const collection = await db.collection(MONGO_DB_COLLECTION);

        await collection.insertOne(item);
      } catch (e) {
        console.log(e);
      }

      return item;
    },

    DeleteItem: async (_, { id }) => {
      try {
        const objectId = await ObjectId(id);
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);
        const collection = await db.collection(MONGO_DB_COLLECTION);
        await collection.deleteOne({ _id: objectId });
      } catch (e) {
        console.log(e);
      }

      return { id };
    },

    UpdateItem: async (
      _,
      {
        id,
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      }
    ) => {
      const item = {
        enName,
        enLabelContent,
        enCategories,
        enDescription,
        enPrice,
        swName,
        swLabelContent,
        swCategories,
        swDescription,
        swPrice,
      };
      try {
        const objectId = await ObjectId(id);
        const client = await clientPromise;
        const db = client.db(MONGODB_DB);
        const collection = await db.collection(MONGO_DB_COLLECTION);

        await collection.replaceOne({ _id: objectId }, item);
      } catch (e) {
        console.log(e);
      }

      return item;
    },
  },
};
