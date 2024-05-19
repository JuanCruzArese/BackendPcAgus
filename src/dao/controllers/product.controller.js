import { productManager } from "../managerDB/ProductsManger.js";


export const getProducts = async (req, res) => {
    try {
        const { limit, page, query, stockAvailability } = req.query;
        
        const productos = new productManager();

        const resultado = await productos.getProducts( limit, page, query, stockAvailability )
        
        if(resultado.message==="ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)

    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const getProductByID = async (req, res) => {
    try {
        const {pId} = req.params
        const producto = new productManager()

        const resultado = await producto.getProductById(pId)
        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message:`El producto con el id ${pId} no existe`})
    }
}

export const addProduct = async (req, res) =>{
    try {
        const products = new productManager()
        const newProduct = req.body
        const resultado = await products.addProducto(newProduct)
        if(resultado.message=== "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const updateProduct = async (req, res) =>{
    try {
        const {pId} = req.params;
        const prodUpdate = req.body;
        const products = new productManager();

        const resultado = await products.updateProduct(pId, prodUpdate);

        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(400).json(resultado)
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {pId} = req.params;
        const products = new productManager();

        const resultado = await products.deletedProduct(pId);

        if(resultado.message === "ok"){
            return res.status(200).json(resultado)
        }
        res.status(404).json(resultado);
    } catch (error) {
        res.status(400).json({message: error})
    }
}
