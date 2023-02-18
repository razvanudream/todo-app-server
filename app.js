const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const db = require("./config/database");
const graphQLSchema = require("./graphql/schema/index.js");
const rootResolvers = require("./graphql/resolvers/index.js");

db.authenticate()
  .then(() => console.log("Connection successful to the database"))
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(
  "/api",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: rootResolvers,
    graphiql: true,
  })
);

const PORT = process.env.PROT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
