import http from "http";
import express from "express";
import cors from "cors"
import connectToDB from "./database/db.js";
import helmet from 'helmet'
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;

  connectToDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req) => {
      return req 
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

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

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
