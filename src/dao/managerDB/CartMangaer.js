import { cartModel } from "../models/carts.model.js";
import mongoose from "mongoose";

export class productCart {
    constructor(id, quantity) {
        this.id = id,
        this.quantity = quantity
    }
}

export class cartMongoManager {
    #carts

    constructor(){
        this.#carts = [];
    }

    async getCarts(){
        try {
            const carritos = await cartModel.find().populate("productos.id").lean()
            return {message: "ok", respuesta: carritos }
        } 
        catch (error) {
            return {message: "error", respuesta: "No hay carritos"}
        }
    }

    async getCartById(id){
        try {
            const cart = await cartModel.findOne({_id: id})
            if(cart){
                return {message: "ok", respuesta: cart}
            }
            else{
                return { message:"error", respuesta: "El carrito no existe"}
            }
        } catch (error) {
            return {message: "error", respuesta: `Error al obtener el carrito: ${error}`}
        }
    }

    async getProducstCartById(id){
        try {
            const cart = await cartModel.findOne({_id: id}).populate("productos.id").lean()
            if(cart){
                return {message: "ok", respuesta: cart}
            }
            else{
                return { message: "error", respuesta: "El carrito no existe o no tiene productos"}
            }
        } catch (error) {
            return {message: "error", respuesta: `Error al obtener los productos del carrito: ${error}`}
        }
    }

    async addProductsInCart(cId, pId, quantity) {
        try {
            this.#carts = await this.getCarts();
            if(!this.#carts){
                return {message: "error", respuesta: "No existen carritos creados"}
            }
            const index = this.#carts.respuesta.findIndex((e) => e._id.equals(cId));
                if (index === -1){
                    return{message: "error", respuesta: `No existe carrito con el id ${cId}`}
                }
                const productsCart = this.#carts.respuesta[index].productos

                const producto = productsCart.find(item => item.productos._id.equals(pId))

                if(producto){
                    const indexProducto = productsCart.findIndex(item => item.productos._id.equals(pId))
                    productsCart[indexProducto].quantity += quantity
                }
                else{
                    const newProducto = { producto: pId, quantity};
                    productsCart.push(newProducto)
                }

                const guardado = await cartModel.findOneAndUpdate(
                    { _id: cId },
                    { productos: productsCart}
                )
                
                return {message: "ok", respuesta: `Producto agregado/actualizado correctamente`}
        } catch (error) {
            return {message: "error", respuesta: `error al actualizar el carrito: ${error}`}
        }
    }

    async addCart(products) {
        try {
            const newCart = cartModel.create(products);
            return {message: "ok", respuesta: newCart._id}
        } 
        catch (error) {
            return  {message: "Error", respuesta: `Error al agregar el carrito: ${error}`}
        }
    }

    async deleteAllProductsOfCart(cId) {
        try {
            const borrado = await cartModel.findOneAndUpdate(
                {_id: cId},
                {productos: []}
            )
            return { message: "ok", respuesta: `Carrito ${cId} vaciado`}
        } catch (error) {
            return { message: "ok", respuesta: `Error al momento de vaciar el carrito ${cId}: ${error}:`}            
        }
    }

    async deleteProductByCart(cId, pId){
        try {
            const result = await cartModel.updateOne(
                {_id: cId},
                { $pull: {productos: { product: new mongoose.Types.ObjectId(pId) } } }
            );

            if(result,modifiedCount > 0) {
                return { message: "ok", respuesta: `Producto ${pId}, fue eliminado correctamente del carrito ${cId}.`}
            } else {
                return { message: "Error", respuesta: `Producto ${pId}, no fue encontrado en el carrito ${cId}`}
            }
        } catch (error) {
            return {message: "Error", respuesta:`Error al eliminar el producto ${pId} del carrito ${cId}: ${error}`}            
        }
    }

}