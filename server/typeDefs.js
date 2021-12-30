import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    GetItems: [Item!]
    GetItem(id: String!): Item!
  }

  type Item {
    _id: String
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

  type DeleteItemResponse {
    id: String
  }

  type CreateItemResponse {
    enName: String
    enLabelContent: String
    enCategories: String
    enDescription: String
    enPrice: String
    swName: String
    swLabelContent: String
    swCategories: String
    swDescription: String
    swPrice: String
  }

  type UpdateItemResponse {
    id: String
    enName: String
    enLabelContent: String
    enCategories: String
    enDescription: String
    enPrice: String
    swName: String
    swLabelContent: String
    swCategories: String
    swDescription: String
    swPrice: String
  }

  type Mutation {
    CreateItem(
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
    ): CreateItemResponse

    DeleteItem(id: String!): DeleteItemResponse

    UpdateItem(
      id: String!
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
    ): UpdateItemResponse
  }
`;
