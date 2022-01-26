import { buildSchema } from "graphql";

const typeDefs = buildSchema(`
  type Query {
    isAuth: Boolean!
    getUser: User
    getUsers: [User!]!
    getCards: [Card!]!
    getRandomCard: Card!
    getLeaderBoard: [User!]!
    getUserCards: [Card!]!
    getUserRanking(name: String!): Int!
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): Boolean!
    loginUser(email: String!, password: String!): Boolean!
    logoutUser: Boolean!
    gameFinished(score: Int!, wolf: Int!, sheep: Int!): User!
    addCardReport(id: ID!): Card!
    createCard(
      title: String!
      text: String!
      answer: Boolean!
    ): Card!
    deleteCard(id:ID!):Card!
    addCardAnswer(id:ID!,bool:Boolean!): Card! 
  }

  type User {
    _id: ID!
    id: ID!
    name: String!
    email: String!
    password: String!
    highScore: Int!
    wolf: Int!
    sheep: Int!
    created_at: String! 
    updated_at: String! 
  }

  type Card {
    _id: ID!
    id: ID!
    title: String!
    text: String!
    author: String!
    true: Int!
    false: Int!
    report: Int!
    created_at: String! 
    updated_at: String! 
  }
`);

export default typeDefs;
