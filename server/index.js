const schema = require("./graphql/schema");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const jwt = require("express-jwt");
const app = express();
require("dotenv").config();

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

// Connect to database
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dataBase = mongoose.connection;
dataBase.once("open", (_) => {
  console.log("Database connected:", process.env.DB);
});
dataBase.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  "/api",
  cors({
    origin: "http://localhost:3000",
  }),
  auth,
  express.json(),
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    pretty: true,
    context: {
      user: req.user || null,
    },
  }))
);

app.listen(process.env.PORT, () => {
  console.log(`Graphql server up at: ${process.env.PORT}`);
});
