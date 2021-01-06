// Este archivo va a definir la manera en que GraphQL va a responder a tus solicitudes de autores.
import graphql from "graphql";
import Book from "../models/book.js";
import BookType from "./bookType.js";

// Esta constante te permitirá usar ciertos tipos de datos GraphQL
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = graphql;

const Authortype = new GraphQLObjectType({
    name: 'Authortype',

    // Deja esta madre como función para poder hacer relaciones entre queries
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},

        books: {
            /*  You have to call the GraphQLList BookType to get a response that matches the 
                books, as well as a resolver with a SELECT WHERE author_id == parent.id */
            type: new GraphQLList(BookType),

            resolve(parent, args) {
                return Book.find({author_id: parent.id});
            }
        }
    })
})

export default Authortype;