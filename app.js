import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import {createServer} from 'node:http';
import dotenv from 'dotenv';
import  connectDB  from './src/config/db.js';
import Message from './src/schema/messages.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

//socket.io
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery : {
        maxDisconnectionDuration: 1000,
    }
});

//DB
async() => {
    try {
        await connectDB();
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection failed');
    }
}

//socket.io

io.on('connection', async(socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', async (msg) => {
        const newMessage = new Message({message: msg});
        await newMessage.save();
        io.emit('chat message', { message: msg, id: newMessage._id.toString() });
}); 

if(!socket.recovered) {
     try {
        const recoveredMessages = await Message.find(); // Obtener mensajes de la BD
        recoveredMessages.forEach((msg) => {

            socket.emit('chat message', { message: msg.message });
        });
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }
}
});

app.use(logger('dev'));// Morgan sirve para ver las peticiones en la consola
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });