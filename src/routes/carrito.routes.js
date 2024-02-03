import { Router } from "express";
import CartManager from "../CartManager.js";

const carritoRoutes = Router();

let Almacenamiento = new CartManager("./carrito.JSON")

carritoRoutes.post("/", async (req, res) =>{
    await Almacenamiento.addCarrito();
    res.send({status: "ok", message:"Se creo el nuevo carrito"})
})

carritoRoutes.get("/:id", async (req, res) =>{
    const { id } = req.params;
    const carrito = await Almacenamiento.getCarritoById(id);
    res.send(carrito)
})

carritoRoutes.post("/:cid/product/:pid", async (req, res) =>{
    const { cid } = req.params;
    const { pid } = req.params;
    await Almacenamiento.agregarProductoAlCarrito(cid,pid)
    res.send({status: "ok", message:"Se agrego el producto al carrito"})

})

export default carritoRoutes