const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const jwt = require('express-jwt')
require('dotenv').config()

const startServer = async (typeDefs, resolvers) => {
	const app = express()
	const httpServer = http.createServer(app)
	const auth = jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['HS256'],
		credentialsRequired: false,
	})

	// Connect to database
	mongoose.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	const dataBase = mongoose.connection
	dataBase.once('open', _ => {
		console.log('Database connected:', process.env.DB)
	})
	dataBase.on('error', console.error.bind(console, 'MongoDB connection error:'))

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			// get the authorization from the request headers
			// return a context obj with our token. if any!
			const auth = req.headers.authorization || ''
			return {
				auth,
			}
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})

	await server.start()

	server.applyMiddleware({
		app,
		auth,
		path: '/',
	})

	await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startServer(typeDefs, resolvers)
