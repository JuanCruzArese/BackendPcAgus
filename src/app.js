import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from "socket.io";
import ProductManager from "./Productmanager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8080;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});

const io = new Server(httpServer);

app.use("/api/products", productosRoutes);

app.use("/api/carts", carritoRoutes);

app.use("/", viewsRoutes);

let Almacenamiento = new ProductManager("../productos.JSON")

let productos;

io.on('connection', socket =>{

    socket.emit('Actualizacion2', productos);

    socket.on('Actualizacion', async data => {
        productos = await Almacenamiento.getProducts();

        io.emit('Actualizacion2', productos);
    });
    
});