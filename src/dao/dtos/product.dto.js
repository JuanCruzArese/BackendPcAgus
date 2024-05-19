class productDto {
    constructor(producto){
        this.title = producto.title,
        this.description = producto.description,
        this.price = producto.price,
        this.code = producto.code,
        this.stock = producto.stock,
        this.status = producto.status,
        this.thumbnail = producto.thumbnail
    }
}

export default productDto