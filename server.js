// set up express and db and apollo
const express = require('express');
const { ApolloServer } = require('apollo-server-express');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// setup jwt middleware
const { authMiddleware } = require('./utils/auth');

// set up port
const PORT = process.env.PORT || 3001;


// set up express app and use middleware for apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})
const app = express();
server.applyMiddleware({app});
// server.start().then(() => {
//     server.applyMiddleware({ app });
//   });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//open server port

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});