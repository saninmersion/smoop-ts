import {Server, Socket} from "socket.io";
import {User} from "../models/UserModel.js";
import {generateRoomId} from "../helpers/index.js";

export const registerChatHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log("A user is connected");

        socket.on('join_room', async ({roomId, userId}) => {
            socket.join(roomId);
            await User.findByIdAndUpdate(userId, {connected: true});
            socket.to(roomId).emit('user_joined', userId)
        })

        socket.on('leave_room', async ({roomId, userId}) => {
            socket.leave(roomId)
            socket.to(roomId).emit('user_left', userId)
        })

        socket.on('disconnect', async () => {
            console.log('user_disconnected')
        })

        // Handle room creation and joining
        socket.on('create_room', () => {
            console.log('creating room...')
            const roomId = generateRoomId();
            console.log(roomId)
            socket.join(roomId);
            io.to(socket.id).emit('room_created', roomId);
        });
    })
}