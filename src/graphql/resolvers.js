import gql             from 'graphql-tag';
// import { ApolloCache } from '@apollo/cache';
import { Resolvers }   from '@apollo/client'
import   Ops           from './Ops'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`


export const resolvers = {
  Mutation: {
    /* bee_update: (_, { letters }, { cache }) => {
     *   const queryResult = cache.readQuery({ query: Ops.bee_put_mu })
     *   if (queryResult) {
     *     const { bee_update } = queryResult;
     *     const data = {
     *       : cartItems.includes(id)
     *                ? cartItems.filter((i) => i !== id)
     *                : [...cartItems, id],
     *     };
     *     cache.writeQuery({ query: GET_CART_ITEMS, data });
     *     return data.cartItems;
     *   }
     *   return [];
     * }, */
  },
}

export default resolvers
