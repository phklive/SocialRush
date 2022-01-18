import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    user: User
    users: [User!]!
    card(title: String!): Card
    cards: [Card!]!
    randCard: Card!
    leaderBoard: [User!]!
    myCards(offset:Int!,limit:Int!): [Card!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): String!
    login(email: String!, password: String!): String!
    addScore(name: String!): User!
    newCard(
      title: String!
      text: String!
      answer: Boolean!
    ): Card!
    modifyCard(id:ID!, title:String!, text:String!, answer:Boolean!):Card!
    deleteCard(id:ID!):Card!
  }

  type User {
    _id: ID!
    id: ID!
    name: String!
    email: String!
    password: String!
    score: Int!
  }

  type Card {
    id: ID!
    title: String!
    text: String!
    answer: Boolean!
    author: String!
  }
`;

export default typeDefs;
