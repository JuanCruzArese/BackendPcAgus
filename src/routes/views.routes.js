import { Router } from "express";
import ProductManager from "../dao/FyleSystem/Productmanager.js";
import { productModel } from "../dao/models/products.model.js";
import { cartModel } from "../dao/models/carts.model.js";
import { CheckExistUser, checkAuth } from "../middlewares/auth.js";

const viewsRoutes = Router();

let Almacenamiento = new ProductManager("./src/dao/FyleSystem/productos.JSON")

viewsRoutes.get("/", checkAuth, (req, res) =>{
    const user = req.session.user;
    res.render( "home", user);
})

viewsRoutes.get("/login", CheckExistUser, (req, res) =>{
    res.render("login")
})

viewsRoutes.get("/register", CheckExistUser, (req, res) =>{
    res.render("register");
})

viewsRoutes.get("/realTime", async (req, res) => {
    const productos = await Almacenamiento.getProducts();
    res.render('realTimeProducts', {productos});
});

viewsRoutes.get("/productos", async (req, res) =>{
    try {
        const { limit = 10, page = 1, query = ""} = req.query;
        const [code, value] = query.split(":"); 
        const productos = await productModel.paginate({[code] : value}, {
            limit,
            page,
        })
        productos.payload = productos.docs;
        const {user} = req.session;
        delete productos.docs;
        res.render("productos", {...productos, user})
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "No se encontraron los productos"})
    }
});

viewsRoutes.get("/carrito/:cId", async (req, res) =>{
    try {
        const { cId } = req.params;
        const cart = await cartModel.findOne({_id: cId}).populate("productos.id");
        const productos = cart.productos
        res.render("carritos", {productos});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error al buscar el carrito"});
    }
})

export default viewsRoutes;
