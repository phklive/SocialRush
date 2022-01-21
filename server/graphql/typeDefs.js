import {gql} from "apollo-server-express";

const typeDefs = gql`
  type Query {
    getUser: User
    getUsers: [User!]!
    getCard(title: String!): Card
    getCards: [Card!]!
    getRandomCard: Card!
    getLeaderBoard: [User!]!
    getUserCards: [Card!]!
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
    addUserScore: User!
    addCardReport(id: ID!): Card!
    createCard(
      title: String!
      text: String!
      answer: Boolean!
    ): Card!
    modifyCard(id:ID!, title:String!, text:String!, answer:Boolean!):Card!
    deleteCard(id:ID!):Card!
    addCardAnswer(id:ID!,bool:Boolean!): Card! 
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
    report: Int!
    title: String!
    text: String!
    answer: Boolean!
    author: String!
    true: Int!
    false: Int!
  }
`;

export default typeDefs;
