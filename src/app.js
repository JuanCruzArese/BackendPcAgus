import express from "express";
import viewsRoutes from "./routes/views.routes.js";
import handlebars from "express-handlebars"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from "socket.io";
import mongoose from "mongoose";
import productsDBroutes from "./routes/productsDB.routes.js";
import { productModel } from "./dao/models/products.model.js";
import cartDBroutes from "./routes/carritoDB.routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRoutes from "./routes/sessionDB.routes.js";
import initialPassport from "./configuration/passport.config.js";
import passport from "passport";
import { Command } from "commander";
import { getVAriables } from "./configuration/config.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

const program = new Command();
program.option("--mode <mode>","Modo de dessarrollo", "Desarrollo")
const options = program.parse();
const { mongo, port, secret } = getVAriables(options)

mongoose.connect(mongo);

app.use(session({
    secret: secret,
    store: MongoStore.create({
     mongoUrl: mongo
    }),
    resave: true,
    saveUninitialized: true
}));

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine("handlebars", hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const httpServer = app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port}`);
});

const io = new Server(httpServer);

app.use("/api/session", sessionRoutes);

app.use("/api/products", productsDBroutes);

app.use("/api/carts", cartDBroutes);

app.use("/", viewsRoutes);

initialPassport();
app.use(passport.initialize());
app.use(passport.session());

let productos;

io.on('connection', socket =>{
    socket.on('Actualizacion', async data => {
        productos = await productModel.find();

        io.emit('Actualizacion2', productos);
    });
    
});