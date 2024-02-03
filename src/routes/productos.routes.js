import { Router } from "express";
import ProductManager from "../Productmanager.js";

const productosRoutes = Router();

let Almacenamiento = new ProductManager("../productos.JSON")

productosRoutes.get(`/`, async (req, res) =>{
    const { limit } = req.query;
    const productos = await Almacenamiento.getProducts();
    const productosLimitados = [];
    if(!limit){
        return res.send(productos)
    };
    for (let i = 0; i < parseInt(limit) ; i++) {
        productosLimitados.push(productos[i])
    };
    res.send(productosLimitados);
})

productosRoutes.get("/:id", async (req, res) =>{
    const { id } = req.params;
    const productos = await Almacenamiento.getProducts();
    const producto = productos.find(p => p.id === parseInt(id));
    if(!id){
        return res.send(productos)
    }
    res.send(producto);
})

productosRoutes.post("/", async (req, res) => {
    const producto = req.body;
    await Almacenamiento.addProduct(producto)
    res.send({status: "ok", message:"Producto agregado"})
})

productosRoutes.put("/:id", async (req,res) => {
    const { id } = req.params;
    const nuevaInfo = req.body;
    await Almacenamiento.updateProduct(parseInt(id),nuevaInfo)
    res.send({status: "ok", message:"Producto actualizado"})
})

productosRoutes.delete("/:id", async (req,res) =>{
    const { id } = req.params;

    await Almacenamiento.deleteProduct(parseInt(id))
    res.send({status: "ok", message:"Producto eliminado"})
})



export default productosRoutes
