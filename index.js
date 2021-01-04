import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import expressgraphql from "express-graphql"
import mongoose from "mongoose";
import schema from "./schema/schema.js";

// Loads the .env's variables for use with interpolated text
dotenv.config();

// Initializes express and CORS
const app = express();
app.use(cors());

// Desestructuración del JSON de expressGraphQL
const {graphqlHTTP} = expressgraphql;

// Connecting to MongoDB
const connectionString = `mongodb://${process.env.HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// MongoDB Configurations
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(res=>console.log('connected'))
.catch(err=>console.log('[Error]: ' `${err}`));

// Use the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Connection string to the server port
app.listen(process.env.SERVER_PORT_API, console.log(`http://${process.env.HOST}:${process.env.SERVER_PORT_API}/graphql`));