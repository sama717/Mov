import './config'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config();

import moviesRouter from './routes/movies.routes'
import showtimesRouter from './routes/showtimes.routes'
import authRouter from "./routes/auth.routes"

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
app.use(cookieParser());
app.use('/api/movies', moviesRouter)
app.use('/api/showtimes', showtimesRouter);
app.use('/api/auth', authRouter);

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