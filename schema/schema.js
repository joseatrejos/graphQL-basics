import graphql from 'graphql';
import query from './Query.js';         // El equivalente a los selects
import mutation from './Mutation.js';   // El equivalente a Altas, bajas, cambios

// This constant will store the standard from GraphQL Schemas,  you will use it as an object in the next line
const {GraphQLSchema} = graphql;

export default new GraphQLSchema( {
    // Si hay un import que se llame igual que el schema de GraphQL, puedes omitir el query: query
    query,
    mutation
});