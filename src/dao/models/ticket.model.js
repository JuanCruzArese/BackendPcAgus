import mongoose from "mongoose";

const ticketCollection = "tickets"

const ticketSchema = mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    purchase_datetime: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
})

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);