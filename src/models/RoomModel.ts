import mongoose from "mongoose";

const RoomSchema: mongoose.Schema = new mongoose.Schema({
    room_id: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

export const Room = mongoose.model('Room', RoomSchema)