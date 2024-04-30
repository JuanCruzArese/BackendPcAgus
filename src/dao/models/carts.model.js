import mongoose from "mongoose";

const cartsCollection = "carts";

const productsSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        unique: true,
        ref: "productos"
    },
    quantity: {
        type: Number,
        require: true
    },
}, { _id : false })

const cartSchema = mongoose.Schema({
    code: {
        type: Number,
        require: true,
        unique: true,
    },
    productos: [productsSchema]
})

export const cartModel = mongoose.model(cartsCollection, cartSchema)
