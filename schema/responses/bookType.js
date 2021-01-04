// Este archivo va a definir la manera en que GraphQL va a responder a tus solicitudes de libros.
import graphql from "graphql";
import Author from "../models/author.js";
import AuthorType from "./authorType.js";

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Booktype',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        authors: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.author_id);
            }
        }
    })
})

export default BookType;