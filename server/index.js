import express from "express";
import {graphqlHTTP} from "express-graphql";
import {makeExecutableSchema} from "@graphql-tools/schema";
import connectToDB from "./database/db.js";
import helmet from 'helmet'
import cors from 'cors'
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
const app = express();
const port = process.env.PORT || 4000;

connectToDB();

app.use(helmet())

app.use(
  session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB || 'mongodb+srv://phk:ZJqeilOJN88IjrQ1@trueorfalsedatabase.zjlxx.mongodb.net/trueorfalse?retryWrites=true&w=majority'
    })
  })
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    context: {req},
    graphiql: true
  }))
);

app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);

