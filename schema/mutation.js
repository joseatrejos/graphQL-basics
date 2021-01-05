// This file will allow you to use the equivalent to INSERTS, DELETES & UPDATES in graphQL.

import graphql from 'graphql';
import BookType from './responses/bookType.js'
import AuthorType from "./responses/authorType.js";
import Book from './models/book.js';
import Author from "./models/author.js";

// Esta constante te permitirá usar ciertos tipos de datos GraphQL
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull} = graphql;

const mutation = new GraphQLObjectType({
    // You name the action, in this case Mutation
    name: 'Mutation',

    // You set a fields JSON
    fields: {

        // And now you set a name each function that will make the mutations, in this case we only use the addBook
        addBook: {

            // To add a book, you will need to define the type as the Response that you expect.
            type: BookType,
            
            // Then you must send the arguments that you will modify. Just use the propertyName and the data type inside brackets.
            args: {
                name: {
                    type: GraphQLString
                },
                author_id: {
                    type: GraphQLID
                }
            },
            
            // Esta función va a terminar de insertar un nuevo libro. Recibe 2 parámetros: a parent(él mismo) y los argumentos que se le mandan.
            resolve(parent, args) {
                const book = new Book(args);
                return book.save();
            }
        },

        removeBook:{
            type: BookType,

            args: {
                id: { type:GraphQLID }
            },

            resolve(parent, args) {
                return Book.findByIdAndRemove(args.id);
            }
        },

        updateBook:{
            type: BookType,

            args: {
                id: { type:GraphQLID },
                name: { type: GraphQLString },
                author_id: { type: GraphQLID }
            },

            resolve(parent, args) {
                return Book.findByIdAndUpdate(
                    args.id, 
                    args
                    // To send a default parameter (for example for a hide/delete), you can just use { deleted:"yes" }
                );
            }
        },

        // Now we will make the author mutations
        addAuthor: {

            // To add a book, you will need to define the type as the Response that you expect.
            type: AuthorType,
            
            // Then you must send the arguments that you will modify
            args: {
                name: {
                    type: GraphQLString
                }
            },
            
            // Esta función va a terminar de insertar un nuevo libro. Recibe 2 parámetros: a parent(él mismo) y los argumentos que se le mandan.
            resolve(parent, args) {
                const author = new Author(args);
                return author.save();
            }
        }
    }
});

export default mutation;