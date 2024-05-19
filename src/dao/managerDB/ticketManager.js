import { ticketModel } from "../models/ticket.model.js";
import { cartMongoManager } from "../managerDB/CartMangaer.js"
import { productManager } from "./ProductsManger.js";

export class ticket {
    constructor(purchase_datetime, purchaser, amount, code){
        this.purchase_datetime = purchase_datetime;
        this.purchaser = purchaser;
        this.amount = amount;
        this.code = code;
    }
}

export class ticketManager {
    async getTickets(){
        try {
            const tickets = await ticketModel.find().lean()
            return {message: "ok", respuesta: tickets}
        } catch (error) {
            return {message: "ok", respuesta: error}
        }
    }

    async ConstructoCode(num) {
        let code = num;
        const tickets = await this.getTickets()
        console.log(tickets)
        const codes = tickets.respuesta.map(objeto => objeto.code);
      
        while (codes.includes(code)) {
          code++;
        }
      
        return code;
    }

    async CreateTicket(cId){
        try {
            const cart = new cartMongoManager();
            const product = new productManager()
            let products = await cart.getProducstCartById(cId);
            products = products.respuesta.productos
            console.log(products)
            let productsCanBuy = []
            let ProductsCantBuy = []
            console.log("Llegue aqui 1")
            for (const producto of products) {
                if (producto.id.stock >= producto.quantity) {
                    productsCanBuy.push(producto);
                    console.log(producto.id.stock)
                    const update = { stock: producto.id.stock - producto.quantity };
                    await product.updateProduct(producto.id._id, update);
                    console.log(producto.id.stock)
                } else {
                    ProductsCantBuy.push(producto);
                }
            }
            const valoresPorProducto = productsCanBuy.map(p => p.id.price * p.quantity);
            const total = valoresPorProducto.reduce((acumulador, valor) => acumulador + valor, 0);
            const purchase_datetime = new Date();
            console.log(purchase_datetime)
            const code = await this.ConstructoCode(1);
            const purchaser = "Juanc.arese@gmail.com";
            const tick = new ticket(purchase_datetime, purchaser, total, code);
            console.log("Llegue aqui 2")
            const resultado = await ticketModel.create(tick);
            console.log("Llegue aqui 3")
            return {message: "ok", respuesta: `Tu compra fue realizada con exito ${resultado}, los siguientes productos no puedieron ser comprado por la falta de stock ${ProductsCantBuy}`};
        } catch (error) {
            return {message: "error", respuesta: `errro al generar el ticket ${error}`}
        }
    }
}