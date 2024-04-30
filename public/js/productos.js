const botones = document.getElementsByTagName("button")

const agregarProductos = async (pId) => {
    const carrito = document.getElementById("idCarrito").value.trim();
    try {
        const resultado = await fetch(`http://localhost:8080/api/carts/${carrito}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "productos": [
                    {
                        "id": `${pId}`,
                        "quantity": 1
                    }
                ]
            })
        });
        if(resultado.ok){
            alert("Se agregó correctamente")
        }
        else{
            alert("Error, no se agregó el producto")
        }
    } catch (error) {
        console.error(error);
        alert("Error, no se agregó el producto")
    }
};

for( let boton of botones){
    boton.addEventListener("click", (event) => {
        agregarProductos(boton.id)
    })
}