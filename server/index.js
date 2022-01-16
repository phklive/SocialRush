import http from "http";
import express from "express";
import connectToDB from "./database/db.js";
import helmet from 'helmet'
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import jwt from "express-jwt";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import "dotenv/config";

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;
  const checkJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  });

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

  app.use(helmet(),checkJwt);

  server.applyMiddleware({ app, path: '/' });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
