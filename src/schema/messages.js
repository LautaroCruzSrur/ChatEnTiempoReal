import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    usuario: String,       // Nombre del usuario
    message: String,       // Contenido del mensaje
    timestamp: { type: Date, default: Date.now } // Marca de tiempo
});

const Message = mongoose.model("Message", messageSchema);

export default Message;