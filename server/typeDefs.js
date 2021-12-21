import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    items: [Item!]
  }

  type Item {
    _id: String!
    enName: String!
    enLabelContent: String!
    enCategories: String!
    enDescription: String!
    enPrice: String!
    swName: String!
    swLabelContent: String!
    swCategories: String!
    swDescription: String!
    swPrice: String!
  }

  type Mutation {
    createItem(
      enName: String!
      enLabelContent: String!
      enCategories: String!
      enDescription: String!
      enPrice: String!
      swName: String!
      swLabelContent: String!
      swCategories: String!
      swDescription: String!
      swPrice: String!
    ): Item!
  }
`;
