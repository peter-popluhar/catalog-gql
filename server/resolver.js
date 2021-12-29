import { ObjectId } from "mongodb";

export const resolvers = {
  Query: {
    GetItems: async (_parent, _args, { dbCollection }) => {
      let items;

      try {
        items = await dbCollection
          .find({})
          .sort({ _id: -1 })
          .toArray();
      } catch (e) {
        console.log(e);
      }

      return JSON.parse(JSON.stringify(items));
    },

    GetItem: async (_parent, { id }, { dbCollection }) => {
      let item;

      try {
        const objectId = await ObjectId(id);

        item = await dbCollection
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
      },
      { dbCollection }
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
        await dbCollection.insertOne(item);
      } catch (e) {
        console.log(e);
      }

      return item;
    },

    DeleteItem: async (_, { id }, { dbCollection }) => {
      try {
        const objectId = await ObjectId(id);
        await dbCollection.deleteOne({ _id: objectId });
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
      },
      { dbCollection }
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

        await dbCollection.replaceOne({ _id: objectId }, item);
      } catch (e) {
        console.log(e);
      }

      return item;
    },
  },
};
