import fs from "fs";

class CartManager {
    constructor(path){
        this.path = path;
    }

    async addCarrito(){
        let carritos = await this.getCarritos();

        function ConstructoId(num, carritos) {
            let id = num;
            const ids = carritos.map(objeto => objeto.id);
            while (ids.includes(id)) {
              id++;
            }
            return id;
        }
        const id = ConstructoId(1,carritos)

        
        const newCarrito = {
            id: id,
            productos: []
        }

        carritos.push(newCarrito)

        await fs.promises.writeFile(this.path, JSON.stringify(carritos), 'utf-8')
    }


    async getCarritos() {
        try {
          const data = await fs.promises.readFile(this.path, "utf-8");
          const Carritos = JSON.parse(data);
          return Carritos;
        } catch (error) {
          console.error(error);
          return [];
        }
    }
    
    async getCarritoById(id){
        let carritos = await this.getCarritos();

        const carrito = carritos.find((p) => p.id === parseInt(id));
        if(!carrito){
            return console.error("El carrito no fue encontrado")
        }
        return carrito;
    }

    async agregarProductoAlCarrito(id,productoId){
        try {
            let carritos = await this.getCarritos();
    
            const carrito = carritos.find((carrito) => carrito.id === parseInt(id));
    
            if (carrito) {
                let producto = carrito.productos.find((p) => p.id === productoId);
    
                if (producto) {
                    producto.cantidad += 1;
                } else {
                    carrito.productos.push({
                        id: productoId,
                        cantidad: 1
                    });
                }
    
                await fs.promises.writeFile(this.path, JSON.stringify(carritos), 'utf-8');
                return carritos;
            } else {
                console.error("El carrito no se encontró");
                return null;
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            throw error;
        }
    }
}

export default CartManager