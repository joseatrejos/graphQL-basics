// Mongoose se conecta a la base de datos para hacer el modelo
import mongoose from 'mongoose';

// Asignas un schema de mongoose en una variable tipo objeto que instanciarás con sus propiedades en la línea siguiente.
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name:String,
    author_id:String
})

export default mongoose.model('Book', BookSchema);