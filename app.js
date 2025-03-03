import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import {createServer} from 'node:http';

const port = process.env.PORT || 3000;
const app = express();

//socket.io
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));// Morgan sirve para ver las peticiones en la consola
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });