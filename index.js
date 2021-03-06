const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')


dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 5000

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD)
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("DB Connection  successful ");
        return server.listen({ port: PORT })
    }).then(
        res => {
            console.log(`Server running at ${res.url}`)
        }
    ).catch(err => {
        console.log(err)
    })