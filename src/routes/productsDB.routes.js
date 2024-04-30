import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";

const productsDBroutes = Router();

productsDBroutes.get("/", async (req, res) =>{
    try {
        const { limit = 10, page = 1, query = "", sort = "" } = req.query;
        const [code, value] = query.split(":"); 
        const productos = await productModel.paginate({[code] : value}, {
            limit,
            page,
            sort : sort ? {price: sort} : {}
        })
        productos.payload = productos.docs;
        delete productos.docs;
        res.send({message: "ok" , ...productos})
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "No se encontraron los productos"})
    }
});

productsDBroutes.post("/", async (req, res) =>{
    try {
        const producto = req.body;
        await productModel.create(producto);
        res.status(201).json({message: "Producto agregado"})
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "El producto no pudo ser agragado"})
    }
});

productsDBroutes.delete("/:pId", async (req, res) =>{
    const { pId } = req.params;
    try {
        await productModel.deleteOne({_id: pId})
        res.send({message:"Producto eliminado"})
    } catch (error) {   
        console.error(error)
        res.status(400).json({message:"Error al eliminar el producto"})
    }
});

productsDBroutes.put("/:pId", async (req, res) =>{
    const { pId } = req.params;
    const nuevoInfo = req.body;
    try {
        const productoActualizado = await productModel.findByIdAndUpdate(pId, nuevoInfo, { new: true });

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json({ mensaje: "Producto actualizado exitosamente", producto: productoActualizado });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al actualizar el producto" });
    }
})

export default productsDBroutes