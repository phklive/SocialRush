import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User!]!
    cards: [Card!]!
    randCard: Card!
    leaderBoard: [User!]!
    myCards(author: String!): [Card!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): String!
    login(email: String!, password: String!): String!
    addScore(name: String!): User!
    newCard(
      title: String!
      text: String!
      answer: Boolean!
      author: String!
    ): Card!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    score: Int!
  }

  type Card {
    title: String!
    text: String!
    answer: Boolean!
    author: String!
  }
`;

export default typeDefs;
