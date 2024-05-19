import userDto from "../dtos/user.dto.js"
import { cartMongoManager } from "../managerDB/CartMangaer.js"
import { ticketManager } from "../managerDB/ticketManager.js"
import { getCurrentUser } from "./session.controller.js"

export const getCarts = async (req, res) => {
    try {
        const { limit } = req.query
        const carts = new cartMongoManager()
    
        const resultado = await carts.getCarts()
    
        if (resultado.message==="ok")
        {
          if (!limit) 
            return res.status(200).json(resultado.respuesta)
    
          const cartsLimit = resultado.respuesta.rdo.slice(0, limit)
          return res.status(200).json(cartsLimit)
        }
        res.status(400).json(resultado)
      } 
      catch (error) {
        res.status(400).json({ message: "Error al obtener los carritos" + error })
      }
    }

export const getCartByID = async (req, res) => {
    try {
        const { cId } = req.params;
        console.log(cId)
        const cart = new cartMongoManager();
        
        const resultado = await cart.getCartById(cId)
        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const getProductsOfCartByID = async (req,res) => {
    try {
        const { cId } = req.params;
        const cart = new cartMongoManager();

        const resultado = await cart.getProducstCartById(cId);
        if(resultado.message === "ok"){
            return res.status(200).json(resultado.respuesta.productos);
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const addProductsToCart = async (req, res) => {
    try {
        const {cId, pId} = req.params;
        const quantity = req.body.quantity;
        const cart = new cartMongoManager();

        const resultado = await cart.addProductsInCart(cId, pId, quantity);
        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const createCart = async (req, res) => {
    try {
        const products = [];
        const cart = new cartMongoManager();

        const resultado = await cart.addCart(products);
        if(resultado.message === "ok"){
            return res.status(200).json(resultado);
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const emptyCart = async (req, res) => {
    try {
        const { cId } = req.params;
        const cart = new cartMongoManager()

        const resultado = await cart.deleteAllProductsOfCart(cId)
        if(resultado.message === "ok"){
            return res.status(200).json(resultado);
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const deleteProductOfCart = async (req, res) => {
    try {
        const { cId, pId} = req.params;
        const cart = new cartMongoManager();

        const resultado = await cart.deleteProductByCart(cId, pId)
        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const generateTicket = async (req,res) => {
    try {
        const {cId} = req.params;
        const ticket = new ticketManager();
        const resultado = await ticket.CreateTicket(cId)
        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: "error cojudo"})
    }
}