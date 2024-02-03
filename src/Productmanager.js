import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getLength(){
    const products = await this.getProducts();
    return products.length
  }

  async addProduct(product) {
    
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.stock ||
      !product.thumbnail ||
      !product.price ||
      !product.available
    ) {
        return console.error('producto invalido')
    }

    let products = await this.getProducts();

    
    function ConstructoId(num, productos) {
      let id = num;
      const ids = productos.map(objeto => objeto.id);
    
      while (ids.includes(id)) {
        id++;
      }
    
      return id;
    }

    const id = ConstructoId(1,products)

    const newProduct = {
        title: product.title,
        description: product.description,
        stock: product.stock,
        thumbnail: product.thumbnail,
        price: product.price,
        code: product.code,
        id: id,
        available: product.available
    }

    products.push(newProduct);
    
    await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')

  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const Productos = JSON.parse(data);
      return Productos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getProductById (id) {
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    if(!product){
        return console.error("El producto no fue encontrado")
    }
    return product;
  }

  async deleteProduct(id){
    const products = await this.getProducts();
    const productsDeleted = products.filter(product => product.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(productsDeleted), 'utf-8')
  }

  async updateProduct(id, productUpdate){
    const products = await this.getProducts();
    const updateProducts = products.map((product) =>{
        if(product.id === id){
            return {
                ...product,
                ...productUpdate,
                id
            }
        }
        return product;
    });
    await fs.promises.writeFile(this.path, JSON.stringify(updateProducts), 'utf-8')
  }
}

export default ProductManager
