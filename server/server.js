const express = require('express');
const { ApolloServer } = require('@apollo/server'); // add apollo server
const { expressMiddleware } = require('@apollo/server/express4'); // add apollo server middleware for express
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes'); // don't need api routes

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  // app.use(routes); // more api routes not needed
  // Server start listing on port PORT and the url for graphQL is also stated how to get there below
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)
      console.log(`GraphQL listening at http://localhost:${PORT}/graphql`)
    });
  });
};

startApolloServer();