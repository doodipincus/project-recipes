import { gql } from "apollo-server-express";
import { productsTypes, productsQuery, productsMutation } from './schema'
import { productResolvers } from './resolver'


export const typeDefs = gql`

  ${productsTypes}
  
  type Query {
    ${productsQuery}
  }

  type Mutation {
    ${productsMutation}
  }
`;

export const resolvers = {
  Query: {
    ...productResolvers.Query,
  },
  Mutation: {
    ...productResolvers.Mutation,
  },
};
