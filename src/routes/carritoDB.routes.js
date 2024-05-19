import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";
import mongoose from "mongoose";
import { addProductsToCart, createCart, deleteProductOfCart, emptyCart, generateTicket, getCartByID, getCarts, getProductsOfCartByID } from "../dao/controllers/cart.controller.js";

const cartDBroutes = Router();

cartDBroutes.get("/", getCarts);
cartDBroutes.get("/:cId", getCartByID);
cartDBroutes.get("/:cId/products", getProductsOfCartByID);
cartDBroutes.put("/:cId/products/:pId", addProductsToCart);
cartDBroutes.post("/", createCart);
cartDBroutes.put("/:cId", emptyCart);
cartDBroutes.delete("/:cId/products/:pId", deleteProductOfCart)
cartDBroutes.post("/:cId", generateTicket);

/*
cartDBroutes.get("/", async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.send({carts});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al buscar los carritos"});
    }
});

cartDBroutes.get("/:cId", async (req, res) => {
    try {
        const { cId } = req.params;
        const cart = await cartModel.findOne({_id: cId}).populate("productos.id");
        res.send(cart);
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al buscar el carrito"});
    }
});


cartDBroutes.delete("/:cId", async (req, res) =>{
    const { cId } = req.params;
    try {
        const eliminacion = await cartModel.deleteOne({_id: pId})
        res.send({message:"Carrito eliminado"})
    } catch (error) {   
        console.error(error)
        res.status(400).json({message:"Error al eliminar el carrito"})
    }
});


cartDBroutes.delete("/:cId/producto/:pId", async (req, res) => {
    const { cId, pId } = req.params;
    try {
        const result = await cartModel.updateOne({_id: cId}, {
            $pull:  {productos : {id: new mongoose.Types.ObjectId(pId)}}
        });
        if(result.modifiedCount > 0){
            res.send({message: "Producto eliminado del carrito"});
        }
        else{
            res.status(400).json({message: "Error al eliminar el producto del carrito"});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al eliminar el producto del carrito"});
    }
});

cartDBroutes.put("/:cId", async (req, res) => {
    const { cId } = req.params;
    const productsToAdd = req.body.productos; 
    try {
        const update = await cartModel.findOneAndUpdate(
            { _id: cId },
            { $addToSet: { productos: { $each: productsToAdd } } }, 
            { upsert: true, new: true }
        );

        if (!update) {
            return res.status(400).json({ message: "Cart not found" });
        }

        res.send({ message: "Products added to the cart", cart: update });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failure to add products" });
    }
});

cartDBroutes.put("/:cId/products/:pId", async (req, res) => {
    const { cId, pId } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findOne({_id: cId});
        if(!cart){
            res.status(400).json({message: "No se encontro el carrito"});
        }
        const product = cart.productos.find(producto => producto.id.toString() === pId);
        if(!product){
            res.status(400).json({message: "No se encontro el producto dentro del carrito"});
        }
        product.quantity += quantity;
        await cart.save();
        res.send({message: "Se actualizo el producto"});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al actualizar el producto"});
    }
});

cartDBroutes.delete("/:cId", async (req, res) =>{
    const { cId } = req.params;
    try {
        const result = await cartModel.updateOne({_id: cId}, {
            productos: []
        });
        if(result.modifiedCount > 0){
            res.send({message: "El carrito se vacio con exito"});
        }
        else{
            res.status(400).json({message: "El carrito no se vacio"});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al vaciar el carrito"});
    }
});

*/

export default cartDBroutes;