import mongoose from "mongoose";

const userCollection = "users";

const cartSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        unique: true,
        ref: "carts"
    },
}, { _id : false })

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    age : {
        type: Number,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    cart : [cartSchema],
    rol : {
        type: String,
        enum: [ "admin", "usuario"],
        required: true
    }
})

export const userModel = mongoose.model(userCollection, userSchema);