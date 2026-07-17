import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

import moviesRouter from './routes/movies.routes'

const app = express();
const server = http.createServer(app);
const base = process.env.BASE_URL;

const io = new Server(server, {
        cors: {
            origin: base,
            methods: ['GET', 'POST']
        }
    }
);

app.use(cors({origin: base}));
app.use(express.json());
app.use('/api/movies', moviesRouter)

app.get('/', (_req, res) => {
    res.json({message: "MOV API is running"})
})


io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

export {io}