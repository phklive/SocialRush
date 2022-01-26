import express from "express";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import connectToDB from "./database/db.js";
import helmet from "helmet";
import cors from "cors";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

connectToDB();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB,
    }),
  })
);

app.use(
  cors({
    origin: [process.env.ORIGIN],
    credentials: true,
  })
);

app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    context: { req },
  }))
);

app.listen(process.env.PORT);
console.log(
  "Running graphql server at https://trueorfalseapp.herokuapp.com/graphql"
);
