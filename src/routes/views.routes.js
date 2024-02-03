import { Router } from "express";
import ProductManager from "../Productmanager.js";

const viewsRoutes = Router();

let Almacenamiento = new ProductManager("../productos.JSON")

viewsRoutes.get("/home", async (req, res) => {
    const productos = await Almacenamiento.getProducts();
    res.render('home', {productos});
});

viewsRoutes.get("/realTime", async (req, res) => {
    const productos = await Almacenamiento.getProducts();
    res.render('realTimeProducts', {productos});
});

export default viewsRoutes;
