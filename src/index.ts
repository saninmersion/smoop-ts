import express from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from "mongoose";
import router from "./routes/index.js";
import {Server} from "socket.io";
import {register} from "./controllers /authentication.js";
import {registerChatHandlers} from "./sockets/ChatSocket.js";

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/', router())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

registerChatHandlers(io);
server.listen(8080, () => {
    console.log("server running on http://localhost:8080")
})

const MONGO_URL = 'mongodb+srv://swoop-db:swoop2024db@swoop.m66ah4y.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))