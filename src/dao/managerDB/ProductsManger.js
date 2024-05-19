import { productModel } from "../models/products.model.js";

export class producto {
    constructor(title, description, price, code, stock, status, thunbnail) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.status = status;
        this.thunbnail = thunbnail;
      }
}

export class productManager {
    async getProducts(limit=10, page=1, query="", stockAvailability="true" ){
       try {
            const parsQuery = query === "" ? {} : JSON.parse(query);
            let search = parsQuery instanceof Object ? parsQuery : {};
            search = stockAvailability==="true" ? { ...search, stock: { $gt: 0 } } : { ...search, stock: 0 };

            const sort = {};
            sort.price = 1

            if (limit <= 0){
                limit = 10;
            }
            const productos = await productModel.paginate(search, {
                limit: limit,
                page: page.
                lean,
                sort: sort
            })
            productos.payload = productos.docs;
            delete productos.docs;
            return {message: "ok" , ...productos}

       } catch (error) {
            return {message: "error", respuesta: `Error al buscar los productos ${error}`}
       } 
    }

    async getProductById(pId){
        try {
            const product = await productModel.findOne({_id: pId}).lean()
            if(product){
                return {message: "ok", respuesta: product}
            } else{
                return { message: "error", respuesta: `El producto con el id:${pId} no existe`}
            }
        } catch (error) {
            return { message: "error", respuesta: `Error al buscar el producto ${pId}: ${error}`}
        }
    }

    async addProducto(producto){
        try {
            const validacion = !producto.title || !producto.description || !producto.price || !producto.code || !producto.stock || !producto.status || !producto.category ? false : true;
            if(!validacion){
                return { message: "error", respuesta:"Los datos del producto estan incompletos"}
            }
            const prod = productModel.findOne({code: producto.code})
            if(prod){
                return { message: "Error", respuesta: `El producto con codigo: ${producto.code} ya existe en la base de datos`}
            } 
            const resultado = await productModel.create(producto)
            return { message: "ok", respuesta: "Producto agregado a la base de datos con exito" }
        } catch (error) {
            return { message: "error", respuesta: `Error al agregar el producto a la base de datos: ${error}`}
        }
    }

    async updateProduct(pId, updateProduct){
        try {
            const actualizacion = await productModel.updateOne({_id: pId}, updateProduct);
            if(actualizacion.modifiedCount > 0){
                return { message: "ok", respuesta: `Se actualizo exitosamente el producto con id:${pId}`}
            } else {
                return { message: "error", respuesta: `El producto con id: ${pId}, no se encuentra en la base de datos`}
            }
        } catch (error) {
            return { message: "error", respuesta: `Error al actualizar el producto: ${error}`}
        }
    }

    async deletedProduct(pId){
        try {
            const deleted = await productModel.deleteOne({_id: pId})
        if(deleteModel.deletedCount === 0){
            return { message: "error", respuesta: `No se encontro el producto ${pId}, en la base de datos para eliminarlo`}
        }
        return { message: "ok", respuesta: `El producto con id: ${pId} fue eliminado con exito`}
        } catch (error) {
            return { message: "error", respuesta: `Error al eliminar el producto ${pId}: ${error}`}
        }
    }
}