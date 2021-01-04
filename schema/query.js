// This file will allow you to use the equivalent to SELECTS in graphQL.

import graphql from 'graphql';
import BookType from "./responses/bookType.js";
import AuthorType from "./responses/authorType.js";
import Book from "./models/book.js";
import Author from "./models/author.js";

// Esta constante va a recibir los parámetros que GraphQL permitirá utilizar en tus queries
const {GraphQLObjectType, GraphQLList, GraphQLID} = graphql;

const query = new GraphQLObjectType({
    // You name the action, in this case Query
    name: 'Query',

    // You set a fields JSON
    fields: {

        // And now you set a name to each of your fields, in this case we will request books
        books: {

            // You instantiate a GraphQLList with the expected response and use a resolver to return it.
            type: new GraphQLList(BookType),

            resolve(parent, args) {
                return Book.find();
            }
            
        },
        
        book: {
            type: BookType,

            args: {
                id: { type:GraphQLID }
            },

            resolve(parent, args) {
                return Book.find(args.id)
            }
        },

        // Now we will request authors
        authors: {
            type: new GraphQLList(AuthorType),

            resolve(parent, args) {
                return Author.find();
            }
        }
    }
});

export default query;